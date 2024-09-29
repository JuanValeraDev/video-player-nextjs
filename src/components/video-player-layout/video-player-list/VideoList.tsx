'use client'

import React, {useState} from 'react';
import {CardTitle} from "@/components/ui/card";
import {VideoType} from "@/types/VideoType";
import VideoListSkeleton from "@/loading/VideoListSkeleton";
import VideoItemCard from "@/components/VideoItemCard";

const VideoList = ({videos, onChangeVideoPlaying, onIncrementLikes, onIncrementWatches}: {
    videos: VideoType[],
    onChangeVideoPlaying: (video: VideoType) => void,
    onIncrementLikes: (id: string) => void,
    onIncrementWatches: (id: string) => void
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const isLoading = !videos || videos.length === 0;

    const filteredVideos = videos.filter(video =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return isLoading ? (
        <VideoListSkeleton/>
    ) : (
        <div className="flex flex-col max-h-dvh p-0">
            <div className="sticky top-0 bg-background z-10 p-4 flex justify-between items-center  flex-col">
                <CardTitle className="text-2xl font-bold mb-4">List of Videos</CardTitle>
                <input
                    type="text"
                    placeholder="Search videos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 border rounded mb-4"
                />
            </div>
            <div
                className="flex-grow overflow-y-auto  p-4 flex flex-row lg:flex lg:flex-col gap-4 bg-secondary rounded-lg">
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
    );
}

VideoList.displayName = 'VideoList';
export default VideoList;
