"use client"

import React, {Suspense, useEffect, useState} from 'react'
import VideoList from './VideoList'
import VideoPlayerCard from "@/components/VideoPlayerCard"
import {Loading} from "@/components/Loading"
import {useVideoData} from '@/hooks/useVideoData'
import {Button} from './ui/button'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'



/*TODO
    - Limpiar código en general !!!
    Mejoras:
    - Hacer Readme documentando tod0 correctamente (como hacer el setup, cómo ejecutar la app y cómo testear las llamadas a la API)
    - Cambiar los vídeos largos por cortos y con sonido contante
    - Que al hacer click en homeLayout se resetee el buscador
    - Creo que aunque vuelvas al home se sigue reproduciendo el vídeo por detrás (o algo raro pasa)
    Bugs:
    - Revisar colores en general -> Buscadores
    - Controlar que al hacer click en la barra de progreso o en skipPrevious y skipBack no cambie el togglePlay
    - Cuando la barra de progreso de un vídeo llega al final el vídeo el botón del play debe quedar en pausa
    Opcionales:
    - (Opcional) Buscar la forma de que se reproduzca el vídeo al hacer hover sobre él (que se propague el evento hacia abajo y no se quede en la card)
    - (Opcional) Implementar testing
    - (Opcional) Crear sección de comentarios -> Nueva tabla en base de datos y nuevo router de tRCP

 */

const VideoAppLayout = () => {
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
                            <Suspense fallback={<Loading/>}>
                                <VideoPlayerCard
                                    video={videoPlaying}
                                    resetPlayer={resetPlayer}
                                    onIncrementLikes={handleIncrementLikes}
                                />
                            </Suspense>
                        </div>

                        <div className="w-full lg:w-1/4 overflow-y-auto lg:ml-0">
                            <Suspense fallback={<Loading/>}>
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

VideoAppLayout.displayName = 'VideoAppLayout'
export default VideoAppLayout
