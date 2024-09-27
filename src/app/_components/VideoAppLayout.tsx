"use client"

import React, {Suspense, useEffect, useState} from 'react'
import VideoList from './VideoList'
import VideoPlayerCard from "@/app/_components/VideoPlayerCard"
import {Loading} from "@/app/_components/Loading";
import {Video} from "@/types/Video";
import {trpc} from '../_trcp/client'

export default function VideoAppLayout() {

    const [videoPlaying, setVideoPlaying] = useState<Video | null>(null)
    const [resetPlayer, setResetPlayer] = useState(false)


    const {data} = trpc.getVideos.useQuery()
    const incrementLikesMutation = trpc.incrementLikes.useMutation()
    const incrementWatchesMutation = trpc.incrementWatches.useMutation()

    const [videos, setVideos] = useState<any[]>([])

    useEffect(() => {
        if (data && data.data) {
            setVideos(data.data)
        }
    }, [data])

    const handleVideoToPlay = (video: Video) => {
        setVideoPlaying(video)
        setResetPlayer(true)
    }

    const handleIncrementLikes = (id: string) => {
        incrementLikesMutation.mutate({videoId: id}, {
            onSuccess: () => {
                setVideos(prevVideos =>
                    prevVideos.map(video =>
                        video.id === id ? {...video, likes_count: video.likes_count + 1} : video
                    )
                )
                if (videoPlaying && videoPlaying.id === id) {
                    setVideoPlaying(prevVideo => prevVideo ? {
                        ...prevVideo,
                        likes_count: prevVideo.likes_count + 1
                    } : null)
                }
            },
            onError: (error) => {
                console.error("Error incrementing likes:", error)
            }
        })
    }
    const handleIncrementWatches = (id: string) => {
        incrementWatchesMutation.mutate({videoId: id}, {
            onSuccess: () => {
                setVideos(prevVideos =>
                    prevVideos.map(video =>
                        video.id === id ? {...video, watch_count: video.watch_count + 1} : video
                    )
                )
            },
            onError: (error) => {
                console.error("Error incrementing likes:", error)
            }
        })
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
                <div className="h-full container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-4 h-full sm:mx-8  lg:mx-2">
                        <div className="w-full lg:w-3/4 overflow-y-auto lg:my-20 mt-10  l:mt-4">
                            <Suspense fallback={<Loading/>}>
                                <VideoPlayerCard
                                    video={videoPlaying ? videoPlaying : undefined}
                                    resetPlayer={resetPlayer}
                                    onIncrementLikes={handleIncrementLikes}
                                    onIncrementWatches={handleIncrementWatches}
                                />
                            </Suspense>
                        </div>
                        <div className="w-full lg:w-1/4 overflow-y-auto">
                            <Suspense fallback={<Loading/>}>
                                <VideoList videos={videos}
                                           onChangeVideoPlaying={handleVideoToPlay}
                                           onIncrementLikes={handleIncrementLikes}
                                           onIncrementWatches={handleIncrementWatches}/>
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
