import Link from "next/link";

export default function Navbar() {
    return (
        <div className="fixed w-full flex text-center items-center justify-between py-5 px-10 border-b backdrop-blur-xl">
            <div className="flex gap-8 items-center">
                <p className="font-extrabold text-2xl">NONTONSKUY</p>
                <div className="flex gap-10">
                    <Link className="text-white hover:text-gray-300" href={"/"}>
                        Home
                    </Link>
                    <Link
                        className="text-white hover:text-gray-300"
                        href={"/movies"}
                    >
                        Movies
                    </Link>
                    <Link
                        className="text-white hover:text-gray-300"
                        href={"/shows"}
                    >
                        TV Shows
                    </Link>
                    <Link
                        className="text-white hover:text-gray-300"
                        href={"/favourite"}
                    >
                        Favourites
                    </Link>
                </div>
            </div>

            <div className="relative flex items-center text-gray-400 focus-within:text-white">
                <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute ml-2"
                >
                    <path
                        d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                    ></path>
                </svg>
                <input
                    type="text"
                    placeholder="Search..."
                    className="pl-8 py-1 rounded-md border-none appearance-none focus:outline-none focus:placeholder:text-gray-300"
                />
            </div>
        </div>
    );
}
