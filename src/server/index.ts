import {publicProcedure, router} from "@/server/trpc";
import {getVideos} from "@/app/lib/actions";

export const appRouter = router({
    getMockVideos: publicProcedure.query(async () => {
        return [{id: "1", name: "video_1"}, {id: "2", name: "video_2"}, {id: "3", name: "video_3"},]
    }),
    getVideos: publicProcedure.query(async ()=>{
        return getVideos()
    })
})
export type AppRouter = typeof appRouter
