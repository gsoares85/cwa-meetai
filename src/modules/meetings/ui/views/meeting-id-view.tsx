"use client";

import {useTRPC} from "@/trpc/client";
import {useMutation, useQueryClient, useSuspenseQuery} from "@tanstack/react-query";
import {LoadingState} from "@/components/loading-state";
import {ErrorState} from "@/components/error-state";
import {MeetingIdViewHeader} from "@/modules/meetings/ui/components/meeting-id-view-header";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {useConfirm} from "@/hooks/use-confirm";
import {UpdateMeetingDialog} from "@/modules/meetings/ui/components/update-meeting-dialog";
import {useState} from "react";
import {UpcomingState} from "@/modules/meetings/ui/components/upcoming-state";
import {ActiveState} from "@/modules/meetings/ui/components/active-state";
import {CancelledState} from "@/modules/meetings/ui/components/cancelled-state";
import {ProcessingState} from "@/modules/meetings/ui/components/processing-state";

interface MeetingIdViewProps {
    meetingId: string;
}

export const MeetingIdView = ({meetingId}: MeetingIdViewProps) => {
    const trpc = useTRPC();
    const queryClient = useQueryClient();
    const router = useRouter();

    const [updateDialogOpen, setUpdateDialogOpen] = useState(false);

    const [RemoveConfirmation, confirmRemove] = useConfirm(
        "Are you sur?",
        "The following action will remove this meeting?"
    )

    const { data } = useSuspenseQuery(
        trpc.meetings.getOne.queryOptions({id: meetingId})
    );

    const removeMeeting = useMutation(
        trpc.meetings.remove.mutationOptions({
            onSuccess: async () => {
                await queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
                // TODO: Invalidate free tier usage
                router.push("/meetings");
            },
            onError: (error) => {
                toast.error(error.message);
            },
        })
    );

    const handleRemoveMeeting = async () => {
        const ok = await confirmRemove();
        if (!ok) return;
        await removeMeeting.mutateAsync({id: meetingId});
    }

    const isActive = data.status === 'active';
    const isUpcoming = data.status === 'upcoming';
    const isCancelled = data.status === 'cancelled';
    const isCompleted = data.status === 'completed';
    const isProcessing = data.status === 'processing';

    return (
        <>
            <RemoveConfirmation />
            <UpdateMeetingDialog
                open={updateDialogOpen}
                onOpenChange={setUpdateDialogOpen}
                initialValues={data}
            />
            <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
                <MeetingIdViewHeader
                    meetingId={meetingId}
                    meetingName={data.name}
                    onEdit={() => setUpdateDialogOpen(true)}
                    onRemove={handleRemoveMeeting}
                />
                {isCancelled && <CancelledState />}
                {isProcessing && <ProcessingState />}
                {isCompleted && <div>Completed</div>}
                {isActive && <ActiveState meetingId={meetingId} />}
                {isUpcoming && (
                    <UpcomingState
                        meetingId={meetingId}
                        onCancelMeeting={() => {}}
                        isCancelling={false}
                    />
                )}
            </div>
        </>
    )
}

export const MeetingIdViewLoading = () => {
    return (
        <LoadingState title="Loading Meeting" description="This may take a few seconds..." />
    )
}

export const MeetingIdViewError = () => {
    return (
        <ErrorState title="Error loading Meeting" description="Please try again later." />
    )
}