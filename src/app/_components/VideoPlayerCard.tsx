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
    },
    resetPlayer: boolean
}

export default function VideoPlayerCard({video, resetPlayer}: VideoPlayerCardProps) {

    const [currentVideo, setCurrentVideo] = useState({
        id: "",
        url: "",
        title: "",
        description: "",
        watch_count: 0,
        likes_count: 0,
    })

    useEffect(() => {
        if (video) {
            setCurrentVideo(video)
        }
    }, [video])

    if (!video) {
        return <div>Loading...</div>
    }

    return (
        <Card className=" lg:mx-10">
            <CardContent className="p-0">
                <div>
                    <VideoPlayer video={currentVideo} resetPlayer={resetPlayer}/>
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
