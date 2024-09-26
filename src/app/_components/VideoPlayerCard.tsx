"use client"

import React, {useState} from 'react'
import {Card, CardContent} from "@/components/ui/card"
import VideoPlayer from './VideoPlayer'
import VideoDetails from './VideoDetails'

interface VideoPlayerCardProps {
    video: {
        id: string
        title: string
        description: string
        watchCount: number
        likesCount: number
        url: string
    }
}

export default function VideoPlayerCard({video}: VideoPlayerCardProps) {
    const [likes, setLikes] = useState(video.likesCount)

    return (
        <Card className="w-full overflow-hidden">
            <CardContent className="p-0">
                <div >
                    <VideoPlayer videoUrlProp={"video.url"}/>
                </div>
                <div className="p-6">
                    <VideoDetails
                        id={video.id}
                        title={video.title}
                        description={video.description}
                        watchCount={video.watchCount}
                        likesCount={likes}
                    />
                </div>
            </CardContent>
        </Card>
    )
}
