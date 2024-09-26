"use client"

import React, {Suspense, useEffect, useState} from 'react'
import VideoList from './VideoList'
import VideoPlayerCard from "@/app/_components/VideoPlayerCard"
import {Loading} from "@/app/_components/Loading";

export default function VideoAppLayout() {

    const [videoPlaying, setVideoPlaying] = useState({})
    const [resetPlayer, setResetPlayer] = useState(false)

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
        setResetPlayer(true)
    }
    useEffect(() => {
        if (resetPlayer) {
            setResetPlayer(false)
        }
    }, [resetPlayer]);


    return (
        <div className=" flex flex-col p-0">
            <header className="bg-primary text-primary-foreground p-4">
                <h1 className="text-2xl font-bold ms-10">Video Player</h1>
            </header>
            <div className="flex-grow overflow-hidden">
                <div className="h-full container mx-auto p-4">
                    <div className="flex flex-col lg:flex-row gap-4 h-full">
                        <div className="w-full lg:w-3/4 overflow-y-auto">
                            <Suspense fallback={<Loading/>}>
                                <VideoPlayerCard
                                    video={videoPlaying}
                                    resetPlayer={resetPlayer}
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
            <footer className="bg-primary text-primary-foreground p-4 text-center">
                <span className="text-l font-bold">Made with ❤️ by JuanValeraDev</span>
            </footer>
        </div>
    )
}
