"use client";

import { useEffect, useState } from "react";
import Trending from "@/components/MainPage/Trending";
import Upcoming from "@/components/MainPage/Upcoming";
import { PlayingNow } from "@/components/MainPage/PlayingNow";

export default function Home() {
    const [isMobile, setIsMobile] = useState(false);
    const [showPopup, setShowPopup] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            {isMobile && showPopup && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center z-50">
                    <div className="relative bg-[#020817] p-8 rounded shadow-lg max-w-sm text-center">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowPopup(false)}
                        >
                            &#x2715;
                        </button>
                        <h2 className="text-lg font-bold">
                            Not Suitable for Mobile View
                        </h2>
                        <p className="mt-2 text-sm">
                            This page is best viewed on a larger screen. Please
                            visit using a tablet or desktop.
                        </p>
                    </div>
                </div>
            )}
            <main className="flex items-center flex-col max-w-screen-2xl mx-auto">
                <div>
                    <PlayingNow />
                </div>
                <div>
                    <Trending />
                </div>
                <div>
                    <Upcoming />
                </div>
            </main>
        </>
    );
}
