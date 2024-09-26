import { fetchRequestHandler } from "@trpc/server/adapters/fetch"
import { appRouter } from "@/server"

const origin = process.env.NEXT_PUBLIC_API_ORIGIN || 'http://localhost:3000'

const handler = async (req: Request) => {
    const corsHeaders = {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    if (req.method === 'OPTIONS') {
        return new Response(null, {
            status: 204,
            headers: corsHeaders,
        })
    }

    const response = await fetchRequestHandler({
        endpoint: "/api/trpc",
        req,
        router: appRouter,
        createContext: () => ({}),
    })

    return new Response(response.body, {
        ...response,
        headers: {
            ...corsHeaders,
            ...response.headers,
        },
    });
};

export { handler as GET, handler as POST }
