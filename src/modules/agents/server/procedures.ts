import {baseProcedure, createTRPCRouter} from "@/trpc/init";
import {db} from "@/db";
import {agents} from "@/db/schema";

export const agentsRouter = createTRPCRouter({
    getMany: baseProcedure.query(async () => {
        return db.select().from(agents);
    })
})