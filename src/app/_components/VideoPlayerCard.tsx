"use client"

import {Card, CardContent} from "@/components/ui/card"
import VideoPlayer from './VideoPlayer'
import VideoDetails from './VideoDetails'
import {VideoTypeProps} from "@/types/VideoType";


export default ({
                    video,
                    resetPlayer,
                    onIncrementLikes,
                }: VideoTypeProps & {
    resetPlayer: boolean;
    onIncrementLikes: (id: string) => void;
}) => {

    return <Card className=" lg:mx-10">
        <CardContent className="p-0">
            <div>
                <VideoPlayer video={video} resetPlayer={resetPlayer}/>
            </div>
            <div className="p-6">
                <VideoDetails
                    video={video}
                    onIncrementLikes={onIncrementLikes}
                />
            </div>
        </CardContent>
    </Card>
}
