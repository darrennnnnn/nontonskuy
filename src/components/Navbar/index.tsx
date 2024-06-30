"use client";

import Link from "next/link";
import SearchBar from "./SearchBar";
import { ModeToggle } from "../ModeToggle";

export default function Navbar() {
    return (
        <div className="flex border-b py-6 w-full">
            <nav className="flex justify-between items-center w-[92%] mx-auto ">
                <div>
                    <p className="font-extrabold text-l lg:text-2xl">
                        NONTONSKUY
                    </p>
                </div>
                <div
                    className={
                        "top-[-100%] backdrop-blur-xl md:static absolute  md:min-h-fit min-h-[60vh] left-0  md:w-auto w-full flex items-center px-5"
                    }
                >
                    <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8 items-center">
                        <li>
                            <Link href={"/"}>Home</Link>
                        </li>
                        <li>
                            <Link href={"/movies"}>Movies</Link>
                        </li>
                        <li>
                            <Link href={"/shows"}>TV Shows</Link>
                        </li>
                    </ul>
                </div>
                <div className="flex gap-2">
                    <SearchBar />
                    <ModeToggle />
                </div>
            </nav>
        </div>
    );
}
