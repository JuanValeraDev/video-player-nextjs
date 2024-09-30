"use client"

import {Card, CardContent} from "@/components/ui/card"
import VideoPlayer from './VideoPlayer'
import VideoPlayerDetails from './VideoPlayerDetails'
import {VideoTypeProps} from "@/types/VideoType"
import VideoPlayerCardSkeleton from "@/components/loading/VideoPlayerCardSkeleton"
import {useEffect, useState} from "react"

const VideoPlayerCard = ({
                             video,
                             onIncrementLikes,
                         }: VideoTypeProps & {
    onIncrementLikes: (id: string) => void;
}) => {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 500);
        return () => clearTimeout(timer);
    }, [video]);

    return isLoading ? <VideoPlayerCardSkeleton/> :
        <Card className="lg:mx-10">
            <CardContent className="p-0">
                <div>
                    <VideoPlayer video={video}/>
                </div>
                <div className="p-6">
                    <VideoPlayerDetails
                        video={video}
                        onIncrementLikes={onIncrementLikes}
                    />
                </div>
            </CardContent>
        </Card>
}
VideoPlayerCard.displayName = 'VideoPlayerCard'
export default VideoPlayerCard
