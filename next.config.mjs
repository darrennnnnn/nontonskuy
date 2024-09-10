/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "image.tmdb.org",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "img.youtube.com",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "cdn.discordapp.com",
                pathname: "**",
            },
        ],
    },
    env: {
        API_KEY: process.env.API_KEY,
    },
};

export default nextConfig;
