export interface Video {
    id: string
    url: string
    title: string
    description: string
    watch_count: number
    likes_count: number
}

export interface VideoProps {
    video?: Video,
    videos?: Video[],
    resetPlayer?: boolean,
    onIncrementLikes?: (id: string) => void,
    onChangeVideoPlaying?: (video: Video) => void
}
