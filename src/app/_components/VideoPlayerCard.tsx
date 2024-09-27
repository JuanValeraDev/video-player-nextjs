"use client"

import React, {useEffect, useState} from 'react'
import {Card, CardContent} from "@/components/ui/card"
import VideoPlayer from './VideoPlayer'
import VideoDetails from './VideoDetails'
import{VideoProps} from "@/types/Video";


export default function VideoPlayerCard({video, resetPlayer, onIncrementLikes}: VideoProps) {

    const [currentVideo, setCurrentVideo] = useState(video)

    useEffect(() => {
        if (video) {
            setCurrentVideo(video)
        }
    }, [video])

    if (!currentVideo) {
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
                        onIncrementLikes={onIncrementLikes}
                    />
                </div>
            </CardContent>
        </Card>
    )
}
