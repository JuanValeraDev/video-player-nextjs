import {createTRPCProxyClient, httpBatchLink} from "@trpc/client";
import {AppRouter} from "./api/trpc/[trpc]";

const client = createTRPCProxyClient<AppRouter>({
    links: [httpBatchLink({
        url: "http://localhost:3000"
    })]
})

export default function Home() {
    const result = client.sayHi.query()
    return (
        <div>{result}</div>
    )
}
