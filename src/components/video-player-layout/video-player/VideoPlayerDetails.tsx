"use client"

import {Button} from "@/components/ui/button"
import {ThumbsUp, Eye} from "lucide-react"
import {VideoTypeProps} from '@/types/VideoType'


const VideoPlayerDetails= ({video, onIncrementLikes}: VideoTypeProps & {
    onIncrementLikes: (id: string) => void
}) => {
    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold mb-4">{video.title}</h1>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                        <Eye className="h-5 w-5 mr-2 text-muted-foreground"/>
                        <span
                            className="text-muted-foreground">{video.watch_count.toLocaleString()} views</span>
                    </div>
                    <div className="flex items-center">
                        <ThumbsUp className="h-5 w-5 mr-2 text-muted-foreground"/>
                        <span
                            className="text-muted-foreground">{video.likes_count.toLocaleString()} likes</span>
                    </div>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onIncrementLikes(video.id)}
                    className="flex items-center"
                    aria-label="Like this video"
                >
                    <ThumbsUp className="h-4 w-4 mr-2"/>
                    Like
                </Button>
            </div>
            <p className="text-muted-foreground">{video.description}</p>
        </div>
    )
}

VideoPlayerDetails.displayName = "VideoPlayerDetails"

export default VideoPlayerDetails
