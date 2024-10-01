"use client"

import React, {Suspense} from 'react'
import VideoPlayerCardSkeleton from "@/components/loading/VideoPlayerCardSkeleton"
import VideoListSkeleton from "@/components/loading/VideoListSkeleton"
import {Button} from '../ui/button'
import Link from 'next/link'
import Footer from "@/components/Footer"

const VideoPlayerLayoutSkeleton = () => {
    return (
        <div className="flex flex-col p-0">
            <header className="bg-primary p-4 flex justify-between items-center">
                <Link href="/">
                    <h1 className="text-2xl text-primary-foreground font-bold ms-10">Video Player</h1>
                </Link>
                <Button disabled>
                    Dark Mode
                </Button>
            </header>

            <div className="flex-grow overflow-hidden flex min-h-screen">
                <div className="h-full container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-4 h-full sm:mx-8 lg:mx-2 justify-around">
                        <div className="w-full lg:w-3/4 lg:my-20 mt-10 l:mt-4 max-w-2xl">
                            <VideoPlayerCardSkeleton />
                        </div>

                        <div className="w-full lg:w-1/4 overflow-y-auto lg:ml-0">
                            <VideoListSkeleton />
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

VideoPlayerLayoutSkeleton.displayName = 'VideoPlayerLayoutSkeleton'
export default VideoPlayerLayoutSkeleton
