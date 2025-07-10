import {ResponsiveDialog} from "@/components/responsive-dialog";
import {AgentForm} from "@/modules/agents/ui/components/agent-form";
import {AgentGetOne} from "@/modules/agents/types";

interface UpdateAgentDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialValues: AgentGetOne;
}

export const UpdateAgentDialog = ({ open, onOpenChange, initialValues }: UpdateAgentDialogProps) => {
    return (
        <ResponsiveDialog
            title="Update Agent"
            description="Update agent details"
            open={open}
            onOpenChange={onOpenChange}
        >
            <AgentForm
                initialValues={initialValues}
                onSuccess={() => onOpenChange(false)}
                onCancel={() => onOpenChange(false)}
            />
        </ResponsiveDialog>
    )
}