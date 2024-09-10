import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/lib/theme-provider";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/react";

import { cn } from "@/lib/utils";
import Footer from "@/components/Footer";
import UserAvatar from "@/components/UserAvatar";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata: Metadata = {
    title: "Nontonskuy",
    description: "A Movie Information App",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased",
                    fontSans.variable
                )}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Navbar>
                        <UserAvatar />
                    </Navbar>
                    {children}
                    <Footer />
                    <Analytics />
                </ThemeProvider>
            </body>
        </html>
    );
}
