import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {ScrollArea} from "@/components/ui/scroll-area"
import {EyeIcon, ThumbsUpIcon} from "lucide-react"

interface Video {
    id: string
    url:string
    title: string
    watch_count: number
    likes_count: number
}

interface VideoListProps {
    videos: Video[],
    handleButtonLikesClick: (id: string) => {}
}

export default function VideoListUI({videos, handleButtonLikesClick}: VideoListProps) {
    return (
        <ScrollArea className="h-[400px] w-full rounded-md border">
            <div className="p-4">
                <h2 className="mb-4 text-2xl font-bold">Video List</h2>
                <div className="grid gap-4">
                    {videos.map((video) => (
                        <Card key={video.id}>
                            <CardHeader>
                                <CardTitle>{video.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <video width={300} height={200} src={video.url}/>
                                <div className="flex justify-between text-sm text-muted-foreground">
                                    <div className="flex items-center">
                                        <EyeIcon className="mr-1 h-4 w-4"/>
                                        <span>{video.watch_count} views</span>
                                    </div>
                                    <div className="flex items-center">
                                        <ThumbsUpIcon className="mr-1 h-4 w-4"/>
                                        <button
                                            onClick={() => handleButtonLikesClick(video.id)}>{video.likes_count} likes</button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </ScrollArea>
    )
}
