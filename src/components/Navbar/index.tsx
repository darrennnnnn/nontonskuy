"use client";

import Link from "next/link";
import { AlignJustify } from "lucide-react";
import { useState } from "react";
export default function Navbar() {
    const [enable, setEnable] = useState(true);

    const handleClick = () => {
        setEnable(!enable);
        console.log(enable);
    };

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
                        enable
                            ? "top-[-100%] backdrop-blur-xl md:static absolute  md:min-h-fit min-h-[60vh] left-0  md:w-auto w-full flex items-center px-5"
                            : "top-[9%] backdrop-blur-xl border-b-2 md:static absolute  md:min-h-fit min-h-[40vh] left-0  md:w-auto w-full flex items-center justify-center  px-5"
                    }
                >
                    <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8 items-center">
                        <li>
                            <Link
                                className="text-white hover:text-gray-300"
                                href={"/"}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="text-white hover:text-gray-300 "
                                href={"/movies"}
                            >
                                Movies
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="text-white hover:text-gray-300 "
                                href={"/shows"}
                            >
                                TV Shows
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="text-white hover:text-gray-300 "
                                href={"/favourite"}
                            >
                                Favourites
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="flex items-center gap-6">
                    <input
                        type="text"
                        placeholder="Search..."
                        className=" py-1 px-4 rounded-md border-none appearance-none focus:outline-none focus:placeholder:text-gray-300 w-32 lg:w-64"
                    />
                    <AlignJustify
                        className="cursor-pointer md:hidden"
                        onClick={handleClick}
                    />
                </div>
            </nav>
        </div>
    );
}
