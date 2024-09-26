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
    resetPlayer?: boolean
}
