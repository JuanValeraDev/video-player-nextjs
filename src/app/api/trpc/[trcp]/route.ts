import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/server";

const handler = (req: Request) => {
    // Configurar las cabeceras de CORS
    const origin = process.env.NODE_ENV === 'production'
        ? 'https://video-player-nextjs-nqed72yx0-juans-projects-4fab09ef.vercel.app'
        : 'http://localhost:3000';

    // Si es una solicitud de preflight (OPTIONS), responde con las cabeceras de CORS
    if (req.method === 'OPTIONS') {
        return new Response(null, {
            status: 204,
            headers: {
                'Access-Control-Allow-Origin': origin,
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
        });
    }

    // Manejar las solicitudes GET y POST
    return fetchRequestHandler({
        endpoint: "/api/trpc",
        req,
        router: appRouter,
        createContext: () => ({}),
    });
};

export { handler as GET, handler as POST };
