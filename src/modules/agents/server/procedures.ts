import {createTRPCRouter, protectedProcedure} from "@/trpc/init";
import {db} from "@/db";
import {agents} from "@/db/schema";
import {agentsInsertSchema} from "@/modules/agents/schemas";
import {z} from "zod";
import {eq} from "drizzle-orm";

export const agentsRouter = createTRPCRouter({
    // TODO: Change get many to use protected procedure
    getMany: protectedProcedure.query(async () => {
        return db.select().from(agents);
    }),
    // TODO: Change get many to use protected procedure
    getOne: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({input}) => {
            const [existentAgent] = await db.select()
                .from(agents)
                .where(eq(agents.id, input.id));

            return existentAgent;
        }),
    create: protectedProcedure.input(agentsInsertSchema).mutation(async ({input, ctx}) => {
        const [createdAgent] = await db.insert(agents).values({
            ...input,
            userId: ctx.auth.user.id,
        }).returning();

        return createdAgent;
    })
})