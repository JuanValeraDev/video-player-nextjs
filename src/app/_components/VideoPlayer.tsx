"use client"

import {useState, useRef, useEffect} from 'react'
import {Slider} from "@/components/ui/slider"
import {Button} from "@/components/ui/button"
import {
    Play, Pause, SkipBack, SkipForward, Volume2, VolumeX,
    Maximize, Minimize, Settings
} from 'lucide-react'
import {VideoTypeProps} from "@/types/VideoType";


export default function VideoPlayer({video, resetPlayer}: VideoTypeProps & {
    resetPlayer: boolean
}) {

    const [isPlaying, setIsPlaying] = useState(false)
    const [isFirstPlaying, setIsFirstPlaying] = useState(true)
    const [progress, setProgress] = useState(0)
    const [volume, setVolume] = useState(1)
    const [isMuted, setIsMuted] = useState(false)
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [playbackRate, setPlaybackRate] = useState(1)
    const [isFullscreen, setIsFullscreen] = useState(false)

    const {url} = video

    const [videoUrl, setVideoUrl] = useState(url)

    const videoRef = useRef<HTMLVideoElement>(null)
    const playerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        const updateProgress = () => {
            setProgress((video.currentTime / video.duration) * 100)
            setCurrentTime(video.currentTime)
        }

        video.addEventListener('timeupdate', updateProgress)
        video.addEventListener('loadedmetadata', () => {
            setDuration(video.duration)
        })

        return () => {
            video.removeEventListener('timeupdate', updateProgress)
        }
    }, [])

    useEffect(() => {
        setVideoUrl(url)
    }, [url])

    useEffect(() => {
        const playVideo = async () => {
            if (isFirstPlaying && videoRef.current) {
                try {
                    await videoRef.current.play()
                    setIsPlaying(true)
                    setIsFirstPlaying(false)
                } catch (error) {
                    console.error("Error playing video:", error)
                }
            }
        }

        if (resetPlayer) {
            if (videoRef.current) {
                videoRef.current.pause()
                videoRef.current.currentTime = 0
            }
            setIsPlaying(false)
            setIsFirstPlaying(true)
            setProgress(0)
            setVolume(1)
            setIsMuted(false)
            setDuration(0)
            setCurrentTime(0)
            setPlaybackRate(1)
            setIsFullscreen(false)
        }
        playVideo()
    }, [resetPlayer, videoUrl])

    const togglePlay = async () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause()
            } else {
                try {
                    await videoRef.current.play()
                } catch (error) {
                    console.error("Error playing video:", error)
                }
            }
            setIsPlaying(!isPlaying)
        }
    }


    const handleProgressChange = (newValue: number[]) => {
        const [value] = newValue
        if (videoRef.current) {
            const time = (value / 100) * duration
            videoRef.current.currentTime = time
            setProgress(value)
        }
    }

    const handleVolumeChange = (newValue: number[]) => {
        const [value] = newValue
        if (videoRef.current) {
            videoRef.current.volume = value
            setVolume(value)
            setIsMuted(value === 0)
        }
    }

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted
            setIsMuted(!isMuted)
            setVolume(isMuted ? 1 : 0)
        }
    }

    const skip = (amount: number) => {
        if (videoRef.current) {
            videoRef.current.currentTime += amount
        }
    }

    const changePlaybackRate = (rate: number) => {
        if (videoRef.current) {
            videoRef.current.playbackRate = rate
            setPlaybackRate(rate)
        }
    }

    const toggleFullscreen = () => {
        if (!playerRef.current) return

        if (!isFullscreen) {
            if (playerRef.current.requestFullscreen) {
                playerRef.current.requestFullscreen()
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen()
            }
        }
        setIsFullscreen(!isFullscreen)
    }

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    }

    return (
        <div ref={playerRef}
             className="relative w-full h-full mx-auto bg-gray-900 rounded-lg shadow-xl">
            <video
                ref={videoRef}
                className="w-full h-auto object-contain rounded-t"
                src={videoUrl}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <Slider
                    value={[progress]}
                    max={100}
                    step={0.1}
                    onValueChange={handleProgressChange}
                    className="w-full mb-4"
                />
                <div className="flex items-center justify-between text-white">
                    <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => skip(-10)}>
                            <SkipBack className="h-4 w-4"/>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={togglePlay}>
                            {isPlaying ? <Pause className="h-6 w-6"/> : <Play className="h-6 w-6"/>}
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => skip(10)}>
                            <SkipForward className="h-4 w-4"/>
                        </Button>
                        <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="icon" onClick={toggleMute}>
                                {isMuted ? <VolumeX className="h-4 w-4"/> : <Volume2 className="h-4 w-4"/>}
                            </Button>
                            <Slider
                                value={[volume]}
                                max={1}
                                step={0.1}
                                onValueChange={handleVolumeChange}
                                className="w-20"
                            />
                        </div>
                        <span className="text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <select
                            value={playbackRate}
                            onChange={(e) => changePlaybackRate(parseFloat(e.target.value))}
                            className="bg-transparent text-white text-sm"
                        >
                            <option value="0.5">0.5x</option>
                            <option value="1">1x</option>
                            <option value="1.5">1.5x</option>
                            <option value="2">2x</option>
                        </select>
                        <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
                            {isFullscreen ? <Minimize className="h-4 w-4"/> : <Maximize className="h-4 w-4"/>}
                        </Button>
                        <Button variant="ghost" size="icon">
                            <Settings className="h-4 w-4"/>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
