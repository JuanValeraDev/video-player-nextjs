// src/app/api/trpc/[trpc]/route.ts
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '@/server';

const handler = async (request: Request) => {
    // Definir los headers CORS comunes
    const corsHeaders: Record<string, string> = {
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Permitir orígenes dinámicamente para subdominios de Vercel
    const vercelSubdomain = /\.vercel\.app$/;
    const origin = request.headers.get('origin');

    // Si el origen de la solicitud coincide con el patrón de subdominio de Vercel
    if (origin?.match(vercelSubdomain)) {
        corsHeaders['Access-Control-Allow-Origin'] = origin; // Permitir el origen específico
    } else {
        corsHeaders['Access-Control-Allow-Origin'] = '*'; // O permitir todos los orígenes (puedes ajustar esto según tus necesidades)
    }

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

export const runtime = "edge";
