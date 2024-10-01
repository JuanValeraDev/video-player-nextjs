/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                // coincidiendo con todas las rutas API
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" }, // O cambiar a tu origen específico
                    { key: "Access-Control-Allow-Methods", value: "GET, OPTIONS, PATCH, DELETE, POST, PUT" },
                    { key: "Access-Control-Allow-Headers", value: "Content-Type, content-type, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version" },
                ],
            },
        ];
    },
};

export default nextConfig;
