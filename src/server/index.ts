import {publicProcedure, router} from "@/server/trpc";
import {getVideos, incrementLikes} from "@/app/lib/actions";
import { z } from 'zod';



export const appRouter = router({
    getMockVideos: publicProcedure.query(async () => {
        return [{id: "1", name: "video_1"}, {id: "2", name: "video_2"}, {id: "3", name: "video_3"},]
    }),
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
