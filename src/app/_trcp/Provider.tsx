'use client'

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {httpBatchLink} from "@trpc/client";
import React, {useState} from "react";

import {trpc} from './client'

const API_URL = process.env.NODE_ENV === 'production' ? 'https://video-player-nextjs-2o0itmoch-juans-projects-4fab09ef.vercel.app' : 'http://localhost:3000';


export default function Provider({children}: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient({}))
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpBatchLink({
                    url: `${API_URL}/api/trpc`,
                })
            ]
        }))


    return (
        <trpc.Provider queryClient={queryClient} client={trpcClient}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </trpc.Provider>
    )
}
