'use client'

import {trpc} from '../_trcp/client'
import {useEffect, useState} from 'react'
import { Button } from "@/components/ui/button"
import VideoListUI from '@/components/ui/video-list'


export default function VideoList() {
    const {data} = trpc.getVideos.useQuery()
    const [videos, setVideos] = useState<any[]>([])
    const incrementLikesMutation = trpc.incrementLikes.useMutation()


    useEffect(() => {
        if (data && data.data) {
            setVideos(data.data)
        }
    }, [data])

    const handleButtonLikesClick = (id: string) => {
        incrementLikesMutation.mutate({ videoId: id }, {
            onSuccess: () => {
                setVideos(videos.map(video =>
                    video.id === id ? { ...video, likes_count: video.likes_count + 1 } : video
                ))
            },
            onError: (error) => {
                console.error("Error incrementing likes:", error)
            }
        })
    }

    return (
        <div>
            <div className={"flex flex-col"}>
                {
                    videos.map(video => (
                        <div key={video.id}>
                            <p>{video.title}</p>
                            <video  width={300} height={150} src={video.url}></video>
                            <div className={"flex flex-row"}>
                                <span>{video.watch_count}</span>
                                <button  onClick={() => handleButtonLikesClick(video.id)}>{video.likes_count}</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
