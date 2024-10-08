'use client'

import {Button} from "@/components/ui/button"
import {Clock, Eye, Play, ThumbsUp} from "lucide-react"
import {VideoType} from "@/types/VideoType"
import {useRouter} from "next/navigation"
import {Card} from "@/components/ui/card"
import {useEffect, useState} from "react";


const VideoItemCard = ({video, onChangeVideoPlaying, onIncrementWatches, onIncrementLikes}: {
    video: VideoType,
    onChangeVideoPlaying: (video: VideoType) => void,
    onIncrementLikes: (id: string) => void,
    onIncrementWatches: (id: string) => void
}) => {

    const router = useRouter()


    const [isLiked, setIsLiked] = useState(false)

    useEffect(() => {
        setIsLiked(localStorage.getItem(`isLiked_${video.id}`) === 'true')
    }, [video.id])

    const toggleIsLiked = () => {
        setIsLiked(true)
        localStorage.setItem(`isLiked_${video.id}`, String(true))
    }


    return (
        <Card
            key={video.id}
            className="bg-card text-card-foreground my-4 rounded-lg shadow-md transition-transform hover:scale-105 flex flex-col max-h-80 min-h-52 max-w-52 min-w-36 flex-grow hover:cursor-pointer"
            onClick={() => {
                onChangeVideoPlaying(video)
                onIncrementWatches(video.id)
                router.push(`/video-player?id=${video.id}`)
            }}
        >
            <div className="relative flex-grow">
                <video
                    src={video.url}
                    className="w-full h-full object-cover rounded-t"
                />
                <div
                    className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="text-gray-200" aria-label="Play video">
                        <Play className="h-12 w-12"/>
                    </Button>
                </div>
            </div>
            <div className="p-2 flex flex-col justify-between">
                <h3 className="font-semibold text-m mb-1 line-clamp-1 ">{video.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-1">{video.description}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center">
                        <Eye className="h-3 w-3 mr-0.5"/>
                        <span>{video.watch_count.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-0.5"/>
                        <span>{video.duration.toLocaleString()}</span>
                    </div>

                    {
                        !isLiked ?
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={(event) => {
                                    event.preventDefault()
                                    event.stopPropagation()
                                    onIncrementLikes(video.id)
                                    toggleIsLiked()
                                }}
                                className="flex items-center"
                                aria-label="Like this video"
                            >
                                <ThumbsUp className="h-3 w-3 mr-0.5"/>
                                <span>{video.likes_count.toLocaleString()}</span>
                            </Button> : <Button
                                variant="pressed"
                                size="sm"
                                className="flex items-center"
                                aria-label="This video is already liked"
                                aria-pressed={true}
                                onClick={(event) => {
                                    event.preventDefault()
                                    event.stopPropagation()
                                }}
                            >
                                <ThumbsUp className="h-3 w-3 mr-0.5"/>
                                <span>{video.likes_count.toLocaleString()}</span>
                            </Button>

                    }
                </div>
            </div>
        </Card>
    )
}

VideoItemCard.displayName = 'VideoItemCard'
export default VideoItemCard
