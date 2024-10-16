"use client"

import {useState, useRef, useEffect} from 'react'
import {Slider} from "@/components/ui/slider"
import {Button} from "@/components/ui/button"
import {Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Maximize, Minimize} from 'lucide-react'
import {VideoTypeProps} from "@/types/VideoType"
import {useVideoData} from "@/hooks/useVideoData";

const VideoPlayer = ({video}: VideoTypeProps
) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [progress, setProgress] = useState(0)
    const [volume, setVolume] = useState(1)
    const [isMuted, setIsMuted] = useState(false)
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [playbackRate, setPlaybackRate] = useState(1)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)
    const playerRef = useRef<HTMLDivElement>(null)

    const {resetPlayer} = useVideoData()

    useEffect(() => {
        const videoElement = videoRef.current
        if (!videoElement) return

        const updateProgress = () => {
            setProgress((videoElement.currentTime / videoElement.duration) * 100)
            setCurrentTime(videoElement.currentTime)
        }
        videoElement.addEventListener('timeupdate', updateProgress)
        videoElement.addEventListener('loadedmetadata', () => setDuration(videoElement.duration))

        return () => {
            videoElement.removeEventListener('timeupdate', updateProgress)
        }

    }, [])

    useEffect(() => {
        const playVideo = async () => {
            if (videoRef.current) {
                videoRef.current.load()
                try {
                    const playPromise = videoRef.current.play();
                    if (playPromise !== undefined) {
                        playPromise.then(() => {
                        }).catch(() => {
                        });
                    }
                    setIsPlaying(true)
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
            setProgress(0)
            setVolume(1)
            setIsMuted(false)
            setDuration(0)
            setCurrentTime(0)
            setPlaybackRate(1)
            setIsFullscreen(false)
        }
        playVideo()
    }, [resetPlayer, video.url])

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
            videoRef.current.currentTime = (value / 100) * duration
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
            playerRef.current.requestFullscreen?.()
        } else {
            document.exitFullscreen?.()
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
             className="card relative w-full h-full mx-auto bg-secondary-foreground rounded-lg shadow-xl hover:cursor-pointer"
             onClick={togglePlay}>
            <video preload="none" ref={videoRef} className="w-full h-auto object-contain rounded-t" src={video.url}/>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <Slider value={[progress]} max={100} step={0.1} onValueChange={handleProgressChange}
                        onClick={(event) => {
                            event.preventDefault()
                            event.stopPropagation()

                        }}
                        className="w-full mb-4"/>
                <div className="flex items-center justify-between text-white">
                    <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon" onClick={(event) => {
                            event.preventDefault()
                            event.stopPropagation()
                            skip(-10)
                        }}><SkipBack className="h-4 w-4"/></Button>
                        <Button variant="ghost" size="icon" onClick={togglePlay}>{isPlaying ?
                            <Pause className="h-6 w-6"/> : <Play className="h-6 w-6"/>}</Button>
                        <Button variant="ghost" size="icon" onClick={(event) => {
                            event.preventDefault()
                            event.stopPropagation()
                            skip(10)
                        }}><SkipForward className="h-4 w-4"/></Button>
                        <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="icon" onClick={(event) => {
                                event.preventDefault()
                                event.stopPropagation()
                                toggleMute()
                            }}>{isMuted ?
                                <VolumeX className="h-4 w-4"/> : <Volume2 className="h-4 w-4"/>}</Button>
                            <Slider value={[volume]} max={1} step={0.1} onValueChange={handleVolumeChange}
                                    className="w-20"
                                    onClick={(event) => {
                                        event.preventDefault()
                                        event.stopPropagation()
                                    }}/>
                        </div>
                        <span className="text-sm">{formatTime(currentTime)} / {formatTime(duration)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <select value={playbackRate}
                                onClick={(event) => {
                                    event.preventDefault()
                                    event.stopPropagation()
                                }}
                                onChange={(event) => {
                                    event.preventDefault()
                                    event.stopPropagation()
                                    changePlaybackRate(parseFloat(event.target.value))
                                }}
                                className="bg-transparent text-white text-sm">
                            <option value="0.5">0.5x</option>
                            <option value="1">1x</option>
                            <option value="1.5">1.5x</option>
                            <option value="2">2x</option>
                        </select>
                        <Button variant="ghost" size="icon" onClick={(event) => {
                            event.preventDefault()
                            event.stopPropagation()
                            toggleFullscreen()
                        }}>{isFullscreen ?
                            <Minimize className="h-4 w-4"/> : <Maximize className="h-4 w-4"/>}</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

VideoPlayer.displayName = 'VideoPlayer'
export default VideoPlayer
