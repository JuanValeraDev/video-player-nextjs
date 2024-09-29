"use client"

import React, {Suspense, useEffect, useState} from 'react'
import VideoList from './VideoList'
import VideoPlayerCard from "@/components/video-player-layout/video-player/VideoPlayerCard"
import {useVideoData} from '@/hooks/useVideoData'
import {Button} from '../ui/button'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import VideoPlayerCardSkeleton from "@/loading/VideoPlayerCardSkeleton";
import VideoListSkeleton from "@/loading/VideoListSkeleton";



/*TODO
    - Limpiar código en general !!!
    Mejoras:
    - Añadir enlace a LinkedIn
    - Cambiar los vídeos largos por cortos y con sonido contante
    - Creo que aunque vuelvas al home se sigue reproduciendo el vídeo por detrás (o algo raro pasa)
    Bugs:
    - Revisar colores en general -> Buscadores
    - Controlar que al hacer click en la barra de progreso o en skipPrevious y skipBack no cambie el togglePlay
    - Cuando la barra de progreso de un vídeo llega al final el vídeo el botón del play debe quedar en pausa
    Opcionales:
    - (Opcional) Implementar testing

 */

const VideoPlayerLayout = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const {
        videos,
        videoPlaying,
        resetPlayer,
        handleVideoToPlay,
        handleIncrementLikes,
        handleIncrementWatches
    } = useVideoData()

    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        document.documentElement.classList.toggle('dark');
        setIsDarkMode(!isDarkMode);
    };

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);
    useEffect(() => {
        if (id && videos.length > 0) {
            const video = videos.find(video => video.id === id);
            if (video) {
                handleVideoToPlay(video);
            }
        }
    }, [id, videos]);

    return (
        <div className="flex flex-col p-0">
            <header className="bg-primary p-4 flex justify-between items-center">
                <Link href="/">
                    <h1 className="text-2xl text-primary-foreground  font-bold ms-10">Video Player</h1>
                </Link>
                <Button onClick={toggleDarkMode}>
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </Button>
            </header>

            <div className="flex-grow overflow-hidden flex min-h-screen">
                <div className="h-full container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-4 h-full sm:mx-8 lg:mx-2 justify-around">
                        <div className="w-full lg:w-3/4  lg:my-20 mt-10 l:mt-4 max-w-2xl">
                            <Suspense fallback={<VideoPlayerCardSkeleton/>}>
                                <VideoPlayerCard
                                    video={videoPlaying}
                                    resetPlayer={resetPlayer}
                                    onIncrementLikes={handleIncrementLikes}
                                />
                            </Suspense>
                        </div>

                        <div className="w-full lg:w-1/4 overflow-y-auto lg:ml-0">
                            <Suspense fallback={<VideoListSkeleton/>}>
                                <VideoList
                                    videos={videos}
                                    onChangeVideoPlaying={handleVideoToPlay}
                                    onIncrementLikes={handleIncrementLikes}
                                    onIncrementWatches={handleIncrementWatches}
                                />
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

VideoPlayerLayout.displayName = 'VideoPlayerLayout'
export default VideoPlayerLayout
