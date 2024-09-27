import {useEffect, useState} from 'react'
import {VideoType} from '@/types/VideoType'
import {trpc} from '@/app/_trcp/client'

export const useVideoData = () => {
    const {data} = trpc.getVideos.useQuery()
    const incrementLikesMutation = trpc.incrementLikes.useMutation()
    const incrementWatchesMutation = trpc.incrementWatches.useMutation()

    const [videos, setVideos] = useState<VideoType[]>([])
    const [videoPlaying, setVideoPlaying] = useState<VideoType>({
        id: "",
        url: "",
        title: "",
        description: "",
        watch_count: 0,
        likes_count: 0
    })
    const [resetPlayer, setResetPlayer] = useState(false)


    useEffect(() => {
        if (data && data.data) {
            setVideos(data.data)
        }
    }, [data])

    useEffect(() => {
        if (resetPlayer) {
            setResetPlayer(false)
        }
    }, [resetPlayer])

    const handleVideoToPlay = (video: VideoType) => {
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
                if (videoPlaying.id === id) {
                    setVideoPlaying(prevVideo => ({
                        ...prevVideo,
                        likes_count: prevVideo.likes_count + 1
                    }))
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
                console.error("Error incrementing watches:", error)
            }
        })
    }

    return {videos, videoPlaying, resetPlayer, handleVideoToPlay, handleIncrementLikes, handleIncrementWatches}
}
