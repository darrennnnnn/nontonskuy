"use client";

import Link from "next/link";
import SearchBar from "./SearchBar";
import { ModeToggle } from "../ModeToggle";

export default function Navbar() {
    return (
        <div className="flex border-b w-full">
            <nav className="flex justify-between items-center w-full mx-auto max-w-screen-2xl h-16">
                <div>
                    <p className="font-extrabold text-l lg:text-2xl bg-gradient-to-r from-indigo-500 from-1% via-sky-500 via-30% to-emerald-500 to-90% text-transparent bg-clip-text font-black">
                        NONTONSKUY
                    </p>
                </div>

                <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8 items-center">
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

                <div className="flex gap-2">
                    <SearchBar />
                    <ModeToggle />
                </div>
            </nav>
        </div>
    );
}
