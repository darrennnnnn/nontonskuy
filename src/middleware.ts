export { auth as middleware } from "@/auth";

export const config = {
    matcher: ["/dashboard/:path*", "/rated/:path*", "/likes", "/watchlist"],
};
