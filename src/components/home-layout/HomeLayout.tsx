import {Button} from "@/components/ui/button"
import React, {Suspense, useState} from "react"
import {useVideoData} from "@/hooks/useVideoData"
import {CardTitle} from "@/components/ui/card"
import Link from "next/link"
import HomeLayoutBodySkeleton from "@/components/loading/HomeLayoutBodySkeleton"
import HomeLayoutBody from "@/components/home-layout/HomeLayoutBody"
import Footer from "@/components/Footer"

/* TODO
    BUGS:
    - Arreglar el renderizado del grid cuando se hace like
    - Arreglar problema actual para deploy en Vercel
    - Arreglar el problema de cors para el deploy en Vercel
    MEJORAS:
    - Mirar la cosa que me ha dicho el Jesús para
    - Que cambie el botón de like cuando haces click
    - Añadir el debounce a los buscadores
    - Quitar partes blancas del modo oscuro
    FEATURES:
    - Añadir sistema de usuarios
    - Añadir paginación a las búsquedas
    - Añadir sistema de comentarios
    - Restringir los likes a uno por usuario y vídeo
    - Añadir que se empiece a reproducir el vídeo en la miniatura al poner el ratón encima
 */

export default function Home() {
    const {videos} = useVideoData()
    const [isDarkMode, setIsDarkMode] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')

    const filteredVideos = videos.filter(video =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const toggleDarkMode = () => {
        document.documentElement.classList.toggle('dark')
        setIsDarkMode(!isDarkMode)
    }

    return (
        <>
            <header className="bg-primary p-4 flex justify-between items-center">
                <Link href="/" onClick={() => {
                    setSearchTerm("")
                }}>
                    <h1 className="text-2xl text-primary-foreground  font-bold ms-10">Video Player</h1>
                </Link>
                <input
                    type="text"
                    placeholder="Search videos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 border rounded text-secondary-foreground"
                    style={{ color: 'hsl(var(--input-foreground))'}}
                />
                <Button onClick={toggleDarkMode}>
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </Button>
            </header>
            <div className="flex flex-col max-h-dvh p-0">
                <div className="sticky top-0 bg-background z-10 p-4 flex justify-between items-center flex-col">
                    <CardTitle className="text-2xl font-bold ">List of Videos</CardTitle>
                </div>
                <Suspense fallback={<HomeLayoutBodySkeleton/>}>
                    <HomeLayoutBody filteredVideos={filteredVideos}/>
                </Suspense>
            </div>
         <Footer/>
        </>
    )
}
