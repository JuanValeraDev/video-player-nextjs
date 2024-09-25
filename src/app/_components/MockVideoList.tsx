'use client'

import {trpc} from '../_trcp/client'

export default function MockVideoList() {
    const getMockVideos = trpc.getMockVideos.useQuery()
    return (
        <div>
            <div>{JSON.stringify(getMockVideos.data)}</div>
        </div>
    )
}
