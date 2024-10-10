// src/app/api/trpc/[trpc]/route.ts
import { appRouter } from '@/server';

import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import {withCors} from "@/app/api/trpc/[trcp]/wrapper";
import type { NextApiRequest, NextApiResponse } from 'next';



const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'OPTIONS') {
        res.status(204).setHeader('Access-Control-Allow-Origin', '*')
            .setHeader('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT,OPTIONS')
            .setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version')
            .setHeader('Access-Control-Allow-Credentials', 'true')
            .end();
        return;
    }

    // Convert NextApiRequest to Request
    const request = new Request(req.url!, {
        method: req.method,
        headers: req.headers as HeadersInit,
        body: req.method !== 'GET' && req.method !== 'HEAD' ? req.body : undefined,
    });

    // Handle GET and POST requests for tRPC
    const response = await fetchRequestHandler({
        endpoint: '/api/trpc',
        req: request,
        router: appRouter,
        createContext: () => ({}),
    });

    // Return the response with CORS headers
    res.status(response.status).setHeader('Access-Control-Allow-Origin', '*')
        .setHeader('Access-Control-Allow-Credentials', 'true')
        .send(response.body);
};

export const GET = withCors(handler);
export const POST = withCors(handler);
export const runtime = "edge"; // Keep the runtime configuration


/*
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

 */

