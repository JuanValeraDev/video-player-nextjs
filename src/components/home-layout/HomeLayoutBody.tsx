import Link from "next/link"
import VideoItemCard from "@/components/VideoItemCard"
import React, {useEffect, useState} from "react"
import {VideoType} from "@/types/VideoType"
import {useVideoData} from "@/hooks/useVideoData"
import HomeLayoutBodySkeleton from "@/components/loading/HomeLayoutBodySkeleton"

const HomeLayoutBody = ({searchTerm}: {
    searchTerm: string
}) => {

    const {videos, handleVideoToPlay, handleIncrementLikes, handleIncrementWatches} = useVideoData()

    const [isLoading, setIsLoading] = useState(true)

    const filteredVideos = videos.filter(video =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 200)
        return () => clearTimeout(timer)
    }, [filteredVideos])


    return isLoading ? <HomeLayoutBodySkeleton/> :
        <div className="overflow-y-auto p-4 grid gap-2 bg-secondary rounded-lg justify-items-center "
             style={{gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' , minHeight: 'calc(100vh - 150px)'}}>
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
