'use client'

import React, {useState} from 'react'
import {CardTitle} from "@/components/ui/card"
import {VideoType} from "@/types/VideoType"
import VideoListSkeleton from "@/components/loading/VideoListSkeleton"
import VideoItemCard from "@/components/VideoItemCard"
import {Input} from "@/components/ui/input";
import {Search} from "lucide-react";

const VideoList = ({videos, videoPlaying, onChangeVideoPlaying, onIncrementLikes, onIncrementWatches}: {
    videos: VideoType[],
    videoPlaying: VideoType,
    onChangeVideoPlaying: (video: VideoType) => void,
    onIncrementLikes: (id: string) => void,
    onIncrementWatches: (id: string) => void,
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const isLoading = !videos || videos.length === 0;

    const filteredVideos = videos.filter(video =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) && video.id !== videoPlaying.id
    );

    return isLoading ? (
        <VideoListSkeleton/>
    ) : (
        <div className="flex flex-col max-h-dvh p-0 bg-secondary">
            <div className="sticky top-0 bg-secondary z-10 p-4 flex justify-between items-center  flex-col">
                <CardTitle className="text-2xl font-bold mb-4">List of Videos</CardTitle>
                <div className="relative max-w-sm mx-auto self-center">
                    <Input
                        type="search"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        aria-label="Search"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"
                            aria-hidden="true"/>
                </div>
            </div>
            <div
                className="flex-grow overflow-y-auto  p-4 flex flex-row lg:flex lg:flex-col gap-4 bg-secondary rounded-lg lg:self-center">
                {filteredVideos.map((video) => (
                    <VideoItemCard
                        key={video.id}
                        video={video}
                        onChangeVideoPlaying={() => onChangeVideoPlaying(video)}
                        onIncrementWatches={() => onIncrementWatches(video.id)}
                        onIncrementLikes={() => onIncrementLikes(video.id)}
                    />
                ))}
            </div>
        </div>
    )
}

VideoList.displayName = 'VideoList'
export default VideoList
