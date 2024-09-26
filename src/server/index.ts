import {publicProcedure, router} from "@/server/trpc";
import {getVideos, incrementLikes} from "@/app/lib/actions";
import { z } from 'zod';



export const appRouter = router({
    getVideos: publicProcedure.query(async () => {
        return getVideos()
    }),
    incrementLikes: publicProcedure
        .input(z.object({ videoId: z.string() }))
        .mutation(async ({ input }) => {
            if (input) {
                return incrementLikes(input.videoId);
            } else {
                return false;
            }
        })
})
export type AppRouter = typeof appRouter
