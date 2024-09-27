"use client"

import React, { Suspense } from 'react'
import VideoList from './VideoList'
import VideoPlayerCard from "@/app/_components/VideoPlayerCard"
import { Loading } from "@/app/_components/Loading"
import { useVideoData } from '@/hooks/useVideoData'


/*TODO
    - Poner operador ternario si no hay vídeo para que se muestre el reprouctor vacío
    - Implementar skeletons Loading
    - Dejar solo la interfaz Vídeo y el resto de props ponerlas directamente en la signatura de los componentes
    - Hacer el prevent del evento en el botón de like de VideoList para que no se propague hacia abajo y se reproduzca ese vídeo
    - Buscar la forma de que se reproduzca el vídeo al hacer hover sobre él (que se propague el evento hacia abajo y no se quede en la card)
    - Hacer Readme documentando tod0 correctamente (como hacer el setup, cómo ejecutar la app y cómo testear las llamadas a la API)
    - Implementar testing
    - Subir vídeos mucho más largos y chulos al S3
    - (Opcional) Poder editar la el título y descripción del vídeo
    - (Opcional) Crear filtro
    - (Opcional) Crear sección de comentarios -> Nueva tabla en base de datos y nuevo router de tRCP
    - (Opcional) Volver a Next15

 */

export default function VideoAppLayout() {
    const { videos, videoPlaying, resetPlayer, handleVideoToPlay, handleIncrementLikes, handleIncrementWatches } = useVideoData()

    return (
        <div className="flex flex-col p-0">
            <header className="bg-primary text-primary-foreground p-4">
                <h1 className="text-2xl font-bold ms-10">Video Player</h1>
            </header>

            <div className="flex-grow overflow-hidden flex min-h-screen">
                <div className="h-full container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-4 h-full sm:mx-8 lg:mx-2 justify-around">
                        <div className="w-full lg:w-3/4  lg:my-20 mt-10 l:mt-4 max-w-2xl">
                            <Suspense fallback={<Loading />}>
                                <VideoPlayerCard
                                    video={videoPlaying ? videoPlaying : undefined}
                                    resetPlayer={resetPlayer}
                                    onIncrementLikes={handleIncrementLikes}
                                    onIncrementWatches={handleIncrementWatches}
                                />
                            </Suspense>
                        </div>

                        <div className="w-full lg:w-1/4 overflow-y-auto lg:ml-0">
                            <Suspense fallback={<Loading />}>
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
