"use client"

import React, {Suspense, useState} from 'react'
import VideoList from './VideoList'
import VideoPlayerCard from "@/app/_components/VideoPlayerCard"
import {Loading} from "@/app/_components/Loading";

export default function VideoAppLayout() {

    const [videoPlaying, setVideoPlaying] = useState({})

    interface Video {
        id: string
        url: string
        title: string
        description: string
        watch_count: number
        likes_count: number
    }

    const handleVideoPlaying = (video: Video) => {
        setVideoPlaying(video)
        console.log(video)
    }


    return (
        <div className=" flex flex-col p-0">
            <div className="flex-grow overflow-hidden">
                <div className="h-full container mx-auto p-4">
                    <div className="flex flex-col lg:flex-row gap-4 h-full">
                        <div className="w-full lg:w-3/4 overflow-y-auto">
                            <Suspense fallback={<Loading/>}>
                                <VideoPlayerCard
                                    video={videoPlaying}
                                />
                            </Suspense>
                        </div>
                        <div className="w-full lg:w-1/4 overflow-y-auto">
                            <Suspense fallback={<Loading/>}>
                                <VideoList handleVideoPlaying={handleVideoPlaying}/>
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
