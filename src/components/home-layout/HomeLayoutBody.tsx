import Link from "next/link";
import VideoItemCard from "@/components/VideoItemCard";
import React from "react";
import {VideoType} from "@/types/VideoType";
import {useVideoData} from "@/hooks/useVideoData";
import HomeLayoutBodySkeleton from "@/loading/HomeLayoutBodySkeleton";

const HomeLayoutBody = ({filteredVideos}: {
    filteredVideos: VideoType[]
}) => {

    const {handleVideoToPlay, handleIncrementLikes, handleIncrementWatches} = useVideoData()

    const isLoading = !filteredVideos || filteredVideos.length === 0;

    return isLoading ? <HomeLayoutBodySkeleton/> :
        <div className="overflow-y-auto p-4 grid gap-2 bg-secondary rounded-lg justify-items-center "
             style={{gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))'}}>
            {filteredVideos.map((video) => (
                <Link href={`/video-player?id=${video.id}`} key={video.id}>
                    <VideoItemCard
                        key={video.id}
                        video={video}
                        onChangeVideoPlaying={() => handleVideoToPlay(video)}
                        onIncrementWatches={() => handleIncrementWatches(video.id)}
                        onIncrementLikes={() => handleIncrementLikes(video.id)}
                    />
                </Link>
            ))}
        </div>
}
HomeLayoutBody.displayName = 'HomeLayoutBody'
export default HomeLayoutBody
