'use client'

import {trpc} from '../_trcp/client'

export default function VideoList() {
    const getVideos = trpc.getVideos.useQuery()
    return (
        <div>
            <div>{JSON.stringify(getVideos.data)}</div>
        </div>
    )
}
