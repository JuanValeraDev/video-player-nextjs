export interface VideoType {
    id: string
    url: string
    title: string
    description: string
    watch_count: number
    likes_count: number
}

export interface VideoTypeProps {
    video: VideoType,
}
