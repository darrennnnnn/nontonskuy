import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "../components/Navbar/index";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "NontonSkuy",
    description: "Developed by Darren",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Navbar />
                    <div className="pt-20">{children}</div>
                </ThemeProvider>
            </body>
        </html>
    );
}
