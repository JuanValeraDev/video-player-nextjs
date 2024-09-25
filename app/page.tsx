'use client'

import { useEffect, useState } from 'react';
import {createTRPCProxyClient, httpBatchLink} from "@trpc/client";
import {AppRouter} from "./api/trpc/[trpc]";

const client = createTRPCProxyClient<AppRouter>({
    links: [httpBatchLink({
        url: "http://localhost:3000"
    })]
})
export default function Home() {
    const [result, setResult] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            const response = await client.sayHi.query();
            setResult(response);
        }
        fetchData();
    }, []);

    return (
        <div>{result}</div>
    );
}
