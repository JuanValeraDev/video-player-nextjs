import VideoPlayerLayout from "@/components/video-player-layout/VideoPlayerLayout";
import {Suspense} from "react";
import VideoPlayerLayoutSkeleton from "@/components/loading/VideoPlayerLayoutSkeleton";

export default function Page() {
    return <Suspense fallback={<VideoPlayerLayoutSkeleton/>}>
        <VideoPlayerLayout/>
    </Suspense>
}
