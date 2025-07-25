import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {redirect} from "next/navigation";
import {getQueryClient, trpc} from "@/trpc/server";
import {HydrationBoundary} from "@tanstack/react-query";
import {dehydrate} from "@tanstack/query-core";
import {Suspense} from "react";
import {ErrorBoundary} from "react-error-boundary";
import {MeetingIdView, MeetingIdViewError, MeetingIdViewLoading} from "@/modules/meetings/ui/views/meeting-id-view";

interface MeetingIdProps {
    params: Promise<{ meetingId: string }>
}

const MeetingIdPage = async ({params}: MeetingIdProps) => {
    const {meetingId} = await params;

    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        redirect("/sign-in")
    }

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(
        trpc.meetings.getOne.queryOptions({ id: meetingId })
    )
    // TODO: Prefetch `meetings.getTranscript`

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<MeetingIdViewLoading />}>
                <ErrorBoundary fallback={<MeetingIdViewError />}>
                    <MeetingIdView meetingId={meetingId} />
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
    )
}

export default MeetingIdPage;
