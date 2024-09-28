"use client"

import {Card, CardContent} from "@/components/ui/card"
import VideoPlayer from './VideoPlayer'
import VideoDetails from './VideoDetails'
import {VideoTypeProps} from "@/types/VideoType";
import VideoPlayerCardSkeleton from "@/loading/VideoPlayerCardSkeleton";
import {useEffect, useState} from "react";

const VideoPlayerCard = ({
                             video,
                             resetPlayer,
                             onIncrementLikes,
                         }: VideoTypeProps & {
    resetPlayer: boolean;
    onIncrementLikes: (id: string) => void;
}) => {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, [video]);

    return isLoading ? <VideoPlayerCardSkeleton/> :
        <Card className="lg:mx-10">
            <CardContent className="p-0">
                <div>
                    <VideoPlayer video={video} resetPlayer={resetPlayer}/>
                </div>
                <div className="p-6">
                    <VideoDetails
                        video={video}
                        onIncrementLikes={onIncrementLikes}
                    />
                </div>
            </CardContent>
        </Card>
}
VideoPlayerCard.displayName = 'VideoPlayerCard'
export default VideoPlayerCard
