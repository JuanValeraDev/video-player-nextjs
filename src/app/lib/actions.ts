'use server'

import {createServerClient} from '@supabase/ssr'
import {cookies} from 'next/headers'


export async function createClient() {
    const cookieStore = cookies()

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({name, value, options}) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        }
    )
}

export async function getVideos() {
    const supabase = await createClient();
    const {data: videos} = await supabase.from("videos")
        .select()
        .order('created_at', {ascending: true})
    return {data: videos}
}

export async function incrementLikes(videoId: string) {
    const supabase = await createClient()
    const {data, error} = await supabase
        .rpc('increment_likes', {video_id: videoId})
        .single()

    if (error) {
        throw new Error(`Error incrementing likes: ${error.message}`)
    }
    return data
}
export async function incrementWatches(videoId: string) {
    const supabase = await createClient()
    const {data, error} = await supabase
        .rpc('increment_watches', {video_id: videoId})
        .single()

    if (error) {
        throw new Error(`Error incrementing likes: ${error.message}`)
    }
    return data
}
