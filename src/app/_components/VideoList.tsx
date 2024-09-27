'use client'

import {Button} from "@/components/ui/button"
import {Play, Eye, ThumbsUp} from "lucide-react"
import {CardTitle} from "@/components/ui/card"
import {VideoType} from "@/types/VideoType";


export default ({videos, onChangeVideoPlaying, onIncrementLikes, onIncrementWatches}: {
    videos: VideoType[]
    onChangeVideoPlaying: (video: VideoType) => void,
    onIncrementLikes: (id: string) => void,
    onIncrementWatches: (id: string) => void
}) => {


    return (
        <div className="flex flex-col max-h-dvh p-0">
            <div className="sticky top-0 bg-background z-10 p-4 ">
                <CardTitle className="text-2xl font-bold">List of Videos</CardTitle>
            </div>
            <div
                className="flex-grow overflow-y-auto space-y-4 p-4 flex flex-row lg:flex lg:flex-col gap-4 bg-gray-100 rounded-lg">
                {videos && videos.map((video) => (
                    <div
                        key={video.id}
                        className="bg-card bg-white text-card-foreground rounded-lg shadow-md
                        transition-transform hover:scale-105 flex flex-col lg:h-[400px]
                        flex-grow hover:cursor-pointer
                        "
                        onClick={() => {
                            onChangeVideoPlaying(video)
                            onIncrementWatches(video.id)
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
                        <div className="p-4 flex flex-col justify-between ">
                            <h3 className="font-semibold text-lg mb-2 line-clamp-2">{video.title}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">{video.description}</p>
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <div className="flex items-center">
                                    <Eye className="h-4 w-4 mr-1"/>
                                    <span>{video.watch_count.toLocaleString()}</span>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(event) => {
                                        event.preventDefault()
                                        event.stopPropagation()
                                        onIncrementLikes(video.id)
                                    }}
                                    className="flex items-center"
                                >
                                    <ThumbsUp className="h-4 w-4 mr-1"/>
                                    <span>{video.likes_count.toLocaleString()}</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
