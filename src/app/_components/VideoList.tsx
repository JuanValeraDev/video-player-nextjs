'use client'

import {Button} from "@/components/ui/button"
import {Play, Eye, ThumbsUp} from "lucide-react"
import {CardTitle} from "@/components/ui/card"
import {VideoProps} from "@/types/Video";


export default ({videos, onChangeVideoPlaying, onIncrementLikes}: VideoProps) => {


    return (
        <div className="flex flex-col max-h-dvh p-0">
            <div className="sticky top-0 bg-background z-10 p-4 border-b">
                <CardTitle className="text-2xl font-bold">List of Videos</CardTitle>
            </div>
            <div className="flex-grow overflow-y-auto space-y-4 p-4">
                {videos && videos.map((video) => (
                    <div
                        key={video.id}
                        className="bg-card text-card-foreground rounded-lg shadow-md transition-transform hover:scale-105 flex flex-col lg:h-[400px]"
                    >
                        <div className="relative flex-grow">
                            <video
                                src={video.url}
                                className="w-full h-full object-cover"
                            />
                            <div
                                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                <Button onClick={() => {
                                    if (onChangeVideoPlaying) {
                                        onChangeVideoPlaying(video)
                                    }
                                }} variant="ghost" size="icon" className="text-white" aria-label="Play video">
                                    <Play className="h-12 w-12"/>
                                </Button>
                            </div>
                        </div>
                        <div className="p-4 flex flex-col justify-between h-[120px] lg:h-[140px]">
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
                                    onClick={() => {
                                        if (onIncrementLikes) {
                                            onIncrementLikes(video.id)
                                        }
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
