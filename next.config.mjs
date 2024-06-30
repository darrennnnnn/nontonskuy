/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "image.tmdb.org",
                pathname: "**",
            },
        ],
    },
    env: {
        API_KEY: process.env.API_KEY,
    },
};

export default nextConfig;
