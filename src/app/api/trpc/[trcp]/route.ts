// src/app/api/trpc/[trpc]/route.ts
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '@/server';

const handler = async (request: Request) => {
    // Definir los headers CORS comunes
    const corsHeaders = {
        'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_API_ORIGIN || '*',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Manejar las peticiones OPTIONS para CORS
    if (request.method === 'OPTIONS') {
        return new Response(null, {
            status: 204,
            headers: corsHeaders,
        });
    }

    // Manejar las peticiones GET y POST para tRPC
    const response = await fetchRequestHandler({
        endpoint: '/api/trpc',
        req: request,
        router: appRouter,
        createContext: () => ({}),
    });

    // Agregar los headers de CORS a todas las respuestas
    return new Response(response.body, {
        ...response,
        headers: {
            ...response.headers,
            ...corsHeaders,
        },
    });
};

export { handler as GET, handler as POST };

export const config = {
    runtime: 'edge', // Si Edge Runtime no es necesario, puedes considerar eliminar esto
};
