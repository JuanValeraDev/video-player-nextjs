// src/app/api/trpc/[trpc]/route.ts
import { appRouter } from '@/server';
import {withCors} from "@/app/api/trpc/[trcp]/wrapper";
import {createNextApiHandler} from "@trpc/server/adapters/next";

 withCors(
    createNextApiHandler({
        router: appRouter,

    }))
export { withCors as GET, withCors as POST };

/*
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
const handler = async (request: Request) => {
    if (request.method === 'OPTIONS') {
        return new Response(null, {
            status: 204,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,DELETE,PATCH,POST,PUT,OPTIONS',
                'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
                'Access-Control-Allow-Credentials': 'true',
            },
        });
    }

    // Manejar las peticiones GET y POST para tRPC
    const response = await fetchRequestHandler({
        endpoint: '/api/trpc',
        req: request,
        router: appRouter,
        createContext: () => ({}),
    });

    // Retornar la respuesta
    return new Response(response.body, {
        ...response,
        headers: {
            ...response.headers,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true',
        },
    });
};

export { handler as GET, handler as POST };
export const runtime = "edge"; // Mantener la configuración del runtime


 */
