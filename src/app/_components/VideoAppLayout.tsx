"use client"

import React, { Suspense } from 'react'
import VideoList from './VideoList'
import VideoPlayerCard from "@/app/_components/VideoPlayerCard"
import { Loading } from "@/app/_components/Loading"
import { useVideoData } from '@/hooks/useVideoData'

export default function VideoAppLayout() {
    const { videos, videoPlaying, resetPlayer, handleVideoToPlay, handleIncrementLikes, handleIncrementWatches } = useVideoData()

    return (
        <div className="flex flex-col p-0">
            <header className="bg-primary text-primary-foreground p-4">
                <h1 className="text-2xl font-bold ms-10">Video Player</h1>
            </header>

            <div className="flex-grow overflow-hidden flex min-h-screen">
                <div className="h-full container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-4 h-full sm:mx-8 lg:mx-2 justify-around">
                        <div className="w-full lg:w-3/4  lg:my-20 mt-10 l:mt-4 max-w-2xl">
                            <Suspense fallback={<Loading />}>
                                <VideoPlayerCard
                                    video={videoPlaying ? videoPlaying : undefined}
                                    resetPlayer={resetPlayer}
                                    onIncrementLikes={handleIncrementLikes}
                                    onIncrementWatches={handleIncrementWatches}
                                />
                            </Suspense>
                        </div>

                        <div className="w-full lg:w-1/4 overflow-y-auto lg:ml-0">
                            <Suspense fallback={<Loading />}>
                                <VideoList
                                    videos={videos}
                                    onChangeVideoPlaying={handleVideoToPlay}
                                    onIncrementLikes={handleIncrementLikes}
                                    onIncrementWatches={handleIncrementWatches}
                                />
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
