import React from "react"
import {Card, CardContent} from '@/components/ui/card'
import {Skeleton} from "@/components/ui/skeleton"

const VideoPlayerCardSkeleton = () => {
    return (
        <Card className="lg:mx-10">
            <CardContent className="p-0">
                <div>
                    <div className="relative w-full bg-gray-300  rounded-lg animate-pulse"/>
                </div>
                <div className="p-6">
                    <Skeleton className="h-8 w-3/4 mb-4"/>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex flex-row space-x-4">
                            <Skeleton className="h-6 w-20"/>
                            <Skeleton className="h-6 w-20"/>
                            <Skeleton className="h-6 w-20 "/>
                        </div>
                        <Skeleton className="h-8 w-24"/>
                    </div>
                    <Skeleton className="h-4 w-full mb-2"/>
                    <Skeleton className="h-4 w-5/6"/>

                </div>
            </CardContent>
        </Card>
    );
};

VideoPlayerCardSkeleton.displayName = 'VideoPlayerCardSkeleton'
export default VideoPlayerCardSkeleton;
