"use client"

import {useEffect, useState} from 'react'
import {Button} from "@/components/ui/button"
import {ThumbsUp, Eye} from "lucide-react"
import {trpc} from '../_trcp/client'

interface Video {
    id: string
    title: string
    description: string
    watchCount: number
    likesCount: number
}

interface VideoDetailsProps {
    video?: Video
}

export default function VideoDetails({video}: VideoDetailsProps) {
    if (!video) {
        return <div>Loading...</div>
    }
    const [likes, setLikes] = useState(0)
    const incrementLikesMutation = trpc.incrementLikes.useMutation()
    const [currentVideoDetails, setCurrentVideoDetails] = useState({})


    const handleLikeClick = () => {
        incrementLikesMutation.mutate({videoId: currentVideoDetails.id}, {
            onSuccess: () => {
                setLikes(prevLikes => prevLikes + 1)
            },
            onError: (error) => {
                console.error("Error incrementing likes:", error)
            }
        })
    }

    useEffect(() => {
        setCurrentVideoDetails(video)
    }, [video]);

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold mb-4">{currentVideoDetails.title}</h1>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                        <Eye className="h-5 w-5 mr-2 text-muted-foreground"/>
                        <span className="text-muted-foreground">{currentVideoDetails.watch_count} views</span>
                    </div>
                    <div className="flex items-center">
                        <ThumbsUp className="h-5 w-5 mr-2 text-muted-foreground"/>
                        <span className="text-muted-foreground">{currentVideoDetails.likes_count} likes</span>
                    </div>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLikeClick}
                    className="flex items-center"
                    aria-label="Like this video"
                >
                    <ThumbsUp className="h-4 w-4 mr-2"/>
                    Like
                </Button>
            </div>
            <p className="text-muted-foreground">{currentVideoDetails.description}</p>
        </div>
    )
}
