import {Skeleton} from "@/components/ui/skeleton"
import React from "react"

const HomeLayoutBodySkeleton = () => {

    return <div className="overflow-y-auto p-4 grid gap-2 bg-secondary rounded-lg justify-items-center "
                style={{gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))'}}>
        {[1, 2, 3, 4, 5, 6].map((index) => (
            <div key={index}
                 className="animate-pulse bg-card  rounded-lg shadow-md flex flex-col max-h-80 min-h-52 max-w-52 min-w-36">
                <div className="relative flex-grow">
                    <Skeleton className="w-full h-full object-cover rounded-t"/>
                </div>

                <div className="p-4 flex flex-col justify-between">

                    <Skeleton className="h-6 w-3/4 mb-2"/>
                    <Skeleton className="h-4 w-full mb-2"/>
                    <Skeleton className="h-4 w-5/6 mb-2"/>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center">
                            <Skeleton className="h-4 w-12"/>
                        </div>
                        <Skeleton className="h-6 w-20"/>
                    </div>
                </div>
            </div>
        ))}
    </div>
}
HomeLayoutBodySkeleton.displayName = 'HomeLayoutBodySkeleton'
export default HomeLayoutBodySkeleton
