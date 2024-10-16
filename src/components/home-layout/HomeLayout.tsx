import {Button} from "@/components/ui/button"
import React, {Suspense, useEffect, useState} from "react"
import Link from "next/link"
import HomeLayoutBodySkeleton from "@/components/loading/HomeLayoutBodySkeleton"
import HomeLayoutBody from "@/components/home-layout/HomeLayoutBody"
import Footer from "@/components/Footer"
import {Input} from "@/components/ui/input";
import {Search} from "lucide-react";

/* TODO
    BUGS:
    - Arreglar el problema de cors para el deploy en Vercel
    - Al actualizar en VideoPlayerLayout el vídeo no se reproduce automáticamente
    - Cuando el vídeo se acaba en el reproductor no cambia el botón de play
    MEJORAS:
    - En pantallas grandes, en el grid, que no haya tanta separación.
    - Cambiar la miniatura para que sea una imagen guardada en base de datos.
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
                <div className="flex-row flex gap-3">
                    <div className="relative max-w-sm mx-auto self-center">
                        <Input
                            type="search"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 w-full rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            aria-label="Search"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"
                                aria-hidden="true"/>
                    </div>

                    <Button onClick={toggleDarkMode} className={"my-2 sm:my-0"}>
                        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                    </Button>
                </div>
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
