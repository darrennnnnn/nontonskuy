"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Movie } from "@/lib/types";
import axios from "axios";
import Autoplay from "embla-carousel-autoplay";
import { getGenres } from "@/lib/genre";
import { LoaderCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FaStar } from "react-icons/fa";
import Link from "next/link";

export function PlayingNow() {
    const [content, setContent] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNowPlaying = async () => {
            try {
                const response = await axios.get("/api/playingnow");
                setContent(response.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        setLoading(true);
        fetchNowPlaying();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <LoaderCircle className="animate-spin w-20 h-20" />
            </div>
        );
    }

    return (
        <Carousel
            plugins={[Autoplay({ delay: 3000 })]}
            opts={{ loop: true }}
            className="w-screen h-[550px] bg-[var(--carousel-bg)]"
        >
            <CarouselContent>
                {content.map((item) => (
                    <CarouselItem key={item.id}>
                        <CardContent>
                            <Link href={`/movies/${item.id}`}>
                                <div className="relative flex justify-center">
                                    <div
                                        style={{
                                            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`,
                                            backgroundPosition: "center",
                                        }}
                                        className="h-[550px] max-w-screen-2xl flex justify-end flex-col w-full p-6 bg-cover bg-no-repeat relative"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-[var(--overlay-dark)] via-[var(--overlay-light)] to-[var(--overlay-dark)] opacity-100"></div>
                                        <div className="relative z-10 transform transition-transform hover:scale-95">
                                            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                                                {item.title}
                                            </h1>
                                            <div className="flex gap-2 mt-2 ">
                                                {item.genre_ids.map(
                                                    (genreid) => {
                                                        const numericGenreId =
                                                            Number(genreid);
                                                        if (
                                                            isNaN(
                                                                numericGenreId
                                                            )
                                                        )
                                                            return null;

                                                        const genre =
                                                            getGenres(
                                                                numericGenreId
                                                            );
                                                        return genre ? (
                                                            <Badge
                                                                key={genre.id}
                                                            >
                                                                {genre.name}
                                                            </Badge>
                                                        ) : null;
                                                    }
                                                )}
                                                &#x2022;
                                                <div className="flex items-center gap-1">
                                                    <FaStar className="text-muted-foreground text-md" />
                                                    <p className="text-muted-foreground text-md">
                                                        {parseFloat(
                                                            item.vote_average
                                                        ).toFixed(1)}
                                                    </p>
                                                    <p className="text-muted-foreground text-md">
                                                        &#40;{item.vote_count}
                                                        &#41;
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="leading-7 [&:not(:first-child)]:mt-2">
                                                {item.overview}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </CardContent>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
}