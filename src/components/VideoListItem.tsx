import {Button} from "@/components/ui/button";
import {Clock, Eye, Play, ThumbsUp} from "lucide-react";
import {VideoType} from "@/types/VideoType";

const VideoListItem = ({video, onChangeVideoPlaying, onIncrementWatches, onIncrementLikes}:
                           {
                               video: VideoType,
                               onChangeVideoPlaying: (video: VideoType) => void,
                               onIncrementLikes: (id: string) => void,
                               onIncrementWatches: (id: string) => void
                           }) => {
    return (<div
        key={video.id}
        className="bg-card text-card-foreground rounded-lg shadow-md
                        transition-transform hover:scale-105 flex flex-col lg:h-[400px]
                        flex-grow hover:cursor-pointer
                        "
        onClick={() => {
            onChangeVideoPlaying(video)
            onIncrementWatches(video.id)
        }
        }
    >
        <div className="relative flex-grow">
            <video
                src={video.url}
                className="w-full h-full object-cover rounded-t"
            />
            <div
                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="text-gray-200" aria-label="Play video">
                    <Play className="h-12 w-12"/>
                </Button>
            </div>
        </div>
        <div className="p-4 flex flex-col justify-between ">
            <h3 className="font-semibold text-lg mb-2 line-clamp-2">{video.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{video.description}</p>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-1"/>
                    <span>{video.watch_count.toLocaleString()}</span>
                </div>
                <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 ml-3"/>
                    <span>{video.duration}</span>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={(event) => {
                        event.preventDefault()
                        event.stopPropagation()
                        onIncrementLikes(video.id)
                    }}
                    className="flex items-center"
                >
                    <ThumbsUp className="h-4 w-4 mr-1"/>
                    <span>{video.likes_count.toLocaleString()}</span>
                </Button>
            </div>
        </div>
    </div>)
}

VideoListItem.displayName = 'VideoListItem'
export default VideoListItem
