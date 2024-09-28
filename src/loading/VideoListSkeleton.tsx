import React from "react"
import { CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const VideoListSkeleton = () => {
    return (
        <div className="flex flex-col max-h-dvh p-0">
            {/* Título */}
            <div className="sticky top-0 bg-background z-10 p-4">
                <CardTitle className="text-2xl font-bold">List of Videos</CardTitle>
            </div>

            {/* Contenedor de los videos */}
            <div className="flex-grow overflow-y-auto p-4 flex flex-row lg:flex lg:flex-col gap-4 bg-gray-100 rounded-lg">
                {/* Generamos varios skeletons para simular varios videos */}
                {[...Array(4)].map((_, index) => (
                    <div
                        key={index}
                        className="bg-card bg-white text-card-foreground rounded-lg shadow-md flex flex-col lg:h-[400px] flex-grow"
                    >
                        {/* Skeleton del video */}
                        <div className="relative flex-grow">
                            <Skeleton className="w-full h-full object-cover rounded-t" />
                        </div>

                        {/* Skeleton del contenido del video */}
                        <div className="p-4 flex flex-col justify-between">
                            {/* Título y descripción */}
                            <Skeleton className="h-6 w-3/4 mb-2" />
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-5/6 mb-2" />

                            {/* Vistas y Likes */}
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <div className="flex items-center">
                                    <Skeleton className="h-4 w-12" />
                                </div>
                                <Skeleton className="h-6 w-20" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VideoListSkeleton;
