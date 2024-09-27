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
    onChangeVideoPlaying?: (video: Video) => void,
    onIncrementLikes?: (id: string) => void,
    onIncrementWatches?: (id: string) => void,
}
