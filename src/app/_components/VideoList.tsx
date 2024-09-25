'use client'

import {trpc} from '../_trcp/client'
import {useEffect, useState} from 'react'
import { Button } from "@/components/ui/button"
import { Play, Eye, ThumbsUp } from "lucide-react"


export default function VideoList() {
    const {data} = trpc.getVideos.useQuery()
    const [videos, setVideos] = useState<any[]>([])
    const incrementLikesMutation = trpc.incrementLikes.useMutation()


    useEffect(() => {
        if (data && data.data) {
            setVideos(data.data)
        }
    }, [data])

    const handleButtonLikesClick = (id: string) => {
        incrementLikesMutation.mutate({ videoId: id }, {
            onSuccess: () => {
                setVideos(videos.map(video =>
                    video.id === id ? { ...video, likes_count: video.likes_count + 1 } : video
                ))
            },
            onError: (error) => {
                console.error("Error incrementing likes:", error)
            }
        })
    }

    interface Video {
        id: string
        title: string
        url: string
        thumbnail: string
        watch_count: number
        likes_count: number
    }

    interface VideoListProps {
        videos: Video[]
        handleButtonLikesClick: (id: string) => void
    }

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {videos.map((video) => (
                    <div
                        key={video.id}
                        className="bg-card text-card-foreground rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105"
                    >
                        <div className="relative aspect-video">
                            <video width={300} height={200}
                                src={video.url}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                <Button variant="ghost" size="icon" className="text-white" aria-label="Play video">
                                    <Play className="h-12 w-12" />
                                </Button>
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold text-lg mb-2 line-clamp-2">{video.title}</h3>
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <div className="flex items-center">
                                    <Eye className="h-4 w-4 mr-1" />
                                    <span>{video.watch_count.toLocaleString()}</span>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleButtonLikesClick(video.id)}
                                    className="flex items-center"
                                >
                                    <ThumbsUp className="h-4 w-4 mr-1" />
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
