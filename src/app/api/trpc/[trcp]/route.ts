// src/app/api/trpc/[trpc]/route.ts
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '@/server';

const handler = async (request: Request) => {
    // Manejar las peticiones OPTIONS para CORS no es necesario aquí
    if (request.method === 'OPTIONS') {
        return new Response(null, { status: 204 });
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
            // No necesitas añadir los headers de CORS aquí, ya que se manejan en next.config.mjs
        },
    });
};

export { handler as GET, handler as POST };
export const runtime = "edge"; // Mantener la configuración del runtime
