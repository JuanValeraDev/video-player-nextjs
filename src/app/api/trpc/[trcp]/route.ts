import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/server";

// Obtener el origen permitido desde la variable de entorno
const origin = process.env.NEXT_PUBLIC_API_ORIGIN || 'http://localhost:3000';

const handler = async (req: Request) => {
    // Definir las cabeceras de CORS
    const corsHeaders = {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Si es una solicitud de preflight (OPTIONS), responde con las cabeceras de CORS
    if (req.method === 'OPTIONS') {
        return new Response(null, {
            status: 204,
            headers: corsHeaders,
        });
    }

    // Manejar las solicitudes GET y POST
    const response = await fetchRequestHandler({
        endpoint: "/api/trpc",
        req,
        router: appRouter,
        createContext: () => ({}),
    });

    // Asegurarse de que las cabeceras CORS se añaden a la respuesta
    return new Response(response.body, {
        ...response,
        headers: {
            ...corsHeaders,
            ...response.headers, // Combinar las cabeceras de la respuesta de tRPC con las de CORS
        },
    });
};

export { handler as GET, handler as POST };
