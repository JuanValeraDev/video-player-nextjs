"use client"

import React, {useEffect, useState} from 'react'
import {Card, CardContent} from "@/components/ui/card"
import VideoPlayer from './VideoPlayer'
import VideoDetails from './VideoDetails'

interface VideoPlayerCardProps {
    video: {
        id: string
        url: string
        title: string
        description: string
        watch_count: number
        likes_count: number
    }
}

export default function VideoPlayerCard({video}: VideoPlayerCardProps) {

    const [currentVideo, setCurrentVideo] = useState({})

    useEffect(() => {
        if (video) {
            setCurrentVideo(video)
        }
    }, [video])

    if (!video) {
        return <div>Loading...</div>
    }

    return (
        <Card className="w-full">
            <CardContent className="p-0">
                <div>
                    <VideoPlayer video={currentVideo}/>
                </div>
                <div className="p-6">
                    <VideoDetails
                        video={currentVideo}
                    />
                </div>
            </CardContent>
        </Card>
    )
}
