import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Discord from "next-auth/providers/discord";
import type { Provider } from "next-auth/providers";

const providers: Provider[] = [GitHub, Discord];

export const providerMap = providers.map((provider) => {
    if (typeof provider === "function") {
        const providerData = provider();
        return { id: providerData.id, name: providerData.name };
    } else {
        return { id: provider.id, name: provider.name };
    }
});

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers,
    pages: {
        signIn: "/auth/signin",
        error: "/auth/error",
    },
    callbacks: {
        authorized: async ({ auth }) => {
            return !!auth;
        },
    },
});
