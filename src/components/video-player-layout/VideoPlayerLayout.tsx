"use client"

import React, {Suspense, useEffect, useState} from 'react'
import VideoList from './video-player-list/VideoList'
import VideoPlayerCard from "@/components/video-player-layout/video-player/VideoPlayerCard"
import {useVideoData} from '@/hooks/useVideoData'
import {Button} from '../ui/button'
import Link from 'next/link'
import {useSearchParams} from 'next/navigation'
import VideoPlayerCardSkeleton from "@/components/loading/VideoPlayerCardSkeleton"
import VideoListSkeleton from "@/components/loading/VideoListSkeleton"
import Footer from "@/components/Footer"

const VideoPlayerLayout = () => {
    const searchParams = useSearchParams()
    const id = searchParams.get('id')

    const {
        videos,
        videoPlaying,
        handleVideoToPlay,
        handleIncrementLikes,
        handleIncrementWatches
    } = useVideoData()

    const [isDarkMode, setIsDarkMode] = useState(false)

    useEffect(() => {
        const darkMode = localStorage.getItem('darkMode') === 'true'
        setIsDarkMode(darkMode)
        if (darkMode) {
            document.documentElement.classList.add('dark')
        }
    }, [])

    const toggleDarkMode = () => {
        const newDarkMode = !isDarkMode
        document.documentElement.classList.toggle('dark')
        setIsDarkMode(newDarkMode)
        localStorage.setItem('darkMode', newDarkMode.toString())
    }

    useEffect(() => {
        if (id && videos.length > 0) {
            const video = videos.find(video => video.id === id)
            if (video) {
                handleVideoToPlay(video)
            }
        }
    }, [id, videos, handleVideoToPlay])

    return (
        <div className="flex flex-col p-0">
            <header className="bg-background p-4 flex justify-between items-center">
                <Link href="/">
                    <h1 className="text-2xl font-bold ms-10">Video Player</h1>
                </Link>
                <Button onClick={toggleDarkMode}>
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </Button>
            </header>

            <div className="flex-grow bg-secondary overflow-hidden flex min-h-screen">
                <div className="h-full container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-4 h-full sm:mx-8 lg:mx-2 justify-around">
                        <div className="w-full lg:w-3/4  lg:my-20 mt-10 l:mt-4 max-w-2xl">
                            <Suspense fallback={<VideoPlayerCardSkeleton/>}>
                                <VideoPlayerCard
                                    video={videoPlaying}
                                    onIncrementLikes={handleIncrementLikes}
                                />
                            </Suspense>
                        </div>

                        <div className="w-full lg:w-1/4 overflow-y-auto lg:ml-0">
                            <Suspense fallback={<VideoListSkeleton/>}>
                                <VideoList
                                    videos={videos}
                                    videoPlaying={videoPlaying}
                                    onChangeVideoPlaying={handleVideoToPlay}
                                    onIncrementLikes={handleIncrementLikes}
                                    onIncrementWatches={handleIncrementWatches}
                                />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

VideoPlayerLayout.displayName = 'VideoPlayerLayout'
export default VideoPlayerLayout
