"use client"

import React from 'react'
import VideoList from './VideoList'
import VideoPlayerCard from "@/app/_components/VideoPlayerCard"

export default function VideoAppLayout() {
    return (
        <div className="h-screen flex flex-col">
            <div className="flex-grow overflow-hidden">
                <div className="h-full container mx-auto p-4">
                    <div className="flex flex-col lg:flex-row gap-4 h-full">
                        <div className="w-full lg:w-3/4 overflow-y-auto">
                            <VideoPlayerCard
                                video={{
                                    id: "1",
                                    title: "Test",
                                    description: "This is a test description",
                                    url: "test",
                                    likesCount: 3,
                                    watchCount: 20
                                }}
                            />
                        </div>
                        <div className="w-full lg:w-1/4 overflow-y-auto">
                            <VideoList />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
