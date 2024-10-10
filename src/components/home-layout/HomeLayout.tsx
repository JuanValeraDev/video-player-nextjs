import {Button} from "@/components/ui/button"
import React, {Suspense, useEffect, useState} from "react"
import Link from "next/link"
import HomeLayoutBodySkeleton from "@/components/loading/HomeLayoutBodySkeleton"
import HomeLayoutBody from "@/components/home-layout/HomeLayoutBody"
import Footer from "@/components/Footer"

/* TODO
    BUGS:
    - Arreglar el problema de cors para el deploy en Vercel
    - Al actualizar en VideoPlayerLayout el vídeo no se reproduce automáticamente
    - Cuando el vídeo se acaba en el reproductor no cambia el botón de play
    MEJORAS:
    - En pantallas grandes, en el grid, que no haya tanta separación.
    - Añadir el debounce a los buscadores (Creo que no hace falta)
    - Cambiar la miniatura para que sea una imagen guardada en base de datos.
    FEATURES:
    - Añadir sistema de usuarios
    - Añadir paginación a las búsquedas
    - Añadir sistema de comentarios
 */

export default function Home() {
    const [isDarkMode, setIsDarkMode] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        const darkMode = localStorage.getItem('darkMode') === 'true'
        setIsDarkMode(darkMode)
        if (darkMode) {
            document.documentElement.classList.add('dark')
        }
    }, [])

    const toggleDarkMode = () => {
        const newDarkMode = !isDarkMode
        document.documentElement.classList.toggle('dark')
        setIsDarkMode(newDarkMode)
        localStorage.setItem('darkMode', newDarkMode.toString())
    }


    return (
        <>
            <header className="bg-background p-4 flex justify-between items-center flex-col sm:flex-row ">
                <Link href="/" onClick={() => {
                    setSearchTerm("")
                }}>
                    <h1 className="text-2xl font-bold my-2 sm:my-0">Video Player</h1>
                </Link>
                <input
                    type="text"
                    placeholder="Search videos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 border rounded text-secondary-foreground my-2 sm:my-0"
                    style={{ color: 'hsl(var(--input-foreground))'}}
                />
                <Button onClick={toggleDarkMode} className={"my-2 sm:my-0"}>
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </Button>
            </header>
            <div className="flex flex-col max-h-dvh p-0">
                <Suspense fallback={<HomeLayoutBodySkeleton/>}>
                    <HomeLayoutBody searchTerm={searchTerm}/>
                </Suspense>
            </div>
         <Footer/>
        </>
    )
}
