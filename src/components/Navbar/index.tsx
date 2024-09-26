"use client";

import { useState } from "react";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { ModeToggle } from "../ModeToggle";
import { Menu } from "lucide-react";

export default function Navbar({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className="flex border-b w-full px-4 md:px-6 lg:px-8 sticky z-50 top-0 backdrop-blur-sm">
            <nav className="flex justify-between items-center w-full mx-auto max-w-screen-2xl h-16">
                {/* Logo on the left */}
                <div className="flex-shrink-0">
                    <p className="font-extrabold text-base sm:text-xl lg:text-2xl bg-gradient-to-r from-indigo-500 from-1% via-sky-500 via-30% to-emerald-500 to-90% text-transparent bg-clip-text">
                        NONTONSKUY
                    </p>
                </div>

                <ul className="hidden md:flex md:items-center md:gap-[4vw] gap-8 mx-auto">
                    <li>
                        <Link href={"/"}>
                            <p className="text-sm font-medium leading-none text-muted-foreground hover:text-white hover:scale-105">
                                Home
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/movies"}>
                            <p className="text-sm font-medium leading-none text-muted-foreground hover:text-white hover:scale-105">
                                Movies
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/shows"}>
                            <p className="text-sm font-medium leading-none text-muted-foreground hover:text-white hover:scale-105">
                                TV Shows
                            </p>
                        </Link>
                    </li>
                </ul>

                <div className="hidden md:flex gap-2 flex-shrink-0">
                    <SearchBar />
                    {children}
                </div>

                <div className="md:hidden">
                    <button
                        className="text-sm font-medium leading-none text-muted-foreground hover:text-white flex items-center justify-center"
                        onClick={toggleDropdown}
                    >
                        <Menu />
                    </button>
                </div>
            </nav>

            <div
                className={`md:hidden bg-[#020817] border rounded-lg shadow-lg absolute -top-4 left-0 right-0 p-4 transition-all duration-500 ease-in-out ${
                    dropdownOpen
                        ? "translate-y-20 opacity-100"
                        : "-translate-y-full opacity-0"
                }`}
            >
                {dropdownOpen && (
                    <ul className="flex flex-col gap-8">
                        <li>
                            <SearchBar />
                        </li>
                        <li>
                            <Link href={"/"}>
                                <p className="text-sm font-medium leading-none text-muted-foreground hover:text-black">
                                    Home
                                </p>
                            </Link>
                        </li>
                        <li>
                            <Link href={"/movies"}>
                                <p className="text-sm font-medium leading-none text-muted-foreground hover:text-black">
                                    Movies
                                </p>
                            </Link>
                        </li>
                        <li>
                            <Link href={"/shows"}>
                                <p className="text-sm font-medium leading-none text-muted-foreground hover:text-black">
                                    TV Shows
                                </p>
                            </Link>
                        </li>
                    </ul>
                )}
                <div className="mt-4">{children}</div>
            </div>
        </div>
    );
}
