import {getQueryClient, trpc} from "@/trpc/server";
import {HydrationBoundary} from "@tanstack/react-query";
import {dehydrate} from "@tanstack/query-core";
import {Suspense} from "react";
import {ErrorBoundary} from "react-error-boundary";
import {AgentIdView, AgentIdViewError, AgentIdViewLoading} from "@/modules/agents/ui/views/agent-id-view";

interface AgentPageProps {
    params: Promise<{ agentId: string }>
}

const AgentPage = async ({ params }: AgentPageProps) => {
    const { agentId } = await params;

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(
        trpc.agents.getOne.queryOptions({ id: agentId })
    );

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<AgentIdViewLoading />}>
                <ErrorBoundary fallback={<AgentIdViewError />}>
                    <AgentIdView agentId={agentId} />
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
    )
}

export default AgentPage;
