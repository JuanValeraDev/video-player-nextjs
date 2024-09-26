"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ThumbsUp, Eye } from "lucide-react"
import { trpc } from '../_trcp/client'

interface VideoDetailsProps {
    id: string
    title: string
    description: string
    watchCount: number
    likesCount: number
}

export default function VideoDetails({ id, title, description, watchCount, likesCount }: VideoDetailsProps) {
    const [likes, setLikes] = useState(likesCount)
    const incrementLikesMutation = trpc.incrementLikes.useMutation()

    const handleLikeClick = () => {
        incrementLikesMutation.mutate({ videoId: id }, {
            onSuccess: () => {
                setLikes(prevLikes => prevLikes + 1)
            },
            onError: (error) => {
                console.error("Error incrementing likes:", error)
            }
        })
    }

    return (
        <div className="bg-card text-card-foreground p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">{title}</h1>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                        <Eye className="h-5 w-5 mr-2 text-muted-foreground" />
                        <span className="text-muted-foreground">{watchCount.toLocaleString()} views</span>
                    </div>
                    <div className="flex items-center">
                        <ThumbsUp className="h-5 w-5 mr-2 text-muted-foreground" />
                        <span className="text-muted-foreground">{likes.toLocaleString()} likes</span>
                    </div>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLikeClick}
                    className="flex items-center"
                    aria-label="Like this video"
                >
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Like
                </Button>
            </div>
            <p className="text-muted-foreground">{description}</p>
        </div>
    )
}
