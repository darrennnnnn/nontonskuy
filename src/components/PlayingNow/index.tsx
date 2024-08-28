"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Movie } from "@/lib/types";
import axios from "axios";

export function PlayingNow() {
    const [content, setContent] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNowPlaying = async () => {
            try {
                const response = await axios.get("/api/playingnow");
                setContent(response.data);
                console.log(response.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        setLoading(true);
        fetchNowPlaying();
    }, []);

    return (
        <Carousel className="w-screen h-[550px] bg-[var(--carousel-bg)]">
            <CarouselContent>
                {content.map((item) => (
                    <CarouselItem key={item.id}>
                        <CardContent>
                            <div className="relative flex justify-center">
                                <div
                                    style={{
                                        backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`,
                                        backgroundPosition: "center",
                                    }}
                                    className="h-[550px] max-w-screen-2xl flex justify-end flex-col w-full p-6 bg-cover bg-no-repeat relative"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--overlay-dark)] via-[var(--overlay-light)] to-[var(--overlay-dark)] opacity-100"></div>
                                    <div className="relative z-10">
                                        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                                            {item.title}
                                        </h1>
                                        <p className="leading-7 [&:not(:first-child)]:mt-6">
                                            {item.overview}
                                        </p>
                                        <p className="leading-7 [&:not(:first-child)]:mt-6">
                                            adjsldsadkjsalkdjsakjdlkajkldklaslkdad
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
}

//https://image.tmdb.org/t/p/original/stKGOm8UyhuLPR9sZLjs5AkmncA.jpg
//<div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-black opacity-100"></div>
