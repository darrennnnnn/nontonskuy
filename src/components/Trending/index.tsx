"use client";

import { useEffect, useState } from "react";
import MovieCard from "../MovieCard";
import { Button } from "../ui/button";
import axios from "axios";
import { Clapperboard, Tv } from "lucide-react";
import CardSkeleton from "../CardSkeleton";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    vote_average: string;
}

interface Shows {
    id: number;
    name: string;
    poster_path: string;
    first_air_date: string;
    vote_average: string;
}

export default function Trending() {
    const [content, setContent] = useState<(Movie | Shows)[]>([]);
    const [loading, setLoading] = useState(true);
    const [isMovie, setIsMovie] = useState(true);

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                const endpoint = isMovie ? "movie" : "tv";
                const response = await axios.get(
                    `/api/trending?type=${endpoint}`
                );
                setContent(response.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false)
            }
        };
        setLoading(true);
        fetchTrending();
    }, [isMovie]);

    const handleButtonClick = (
        isMovie: boolean,
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
        setIsMovie(isMovie);
    };
    return (
        <div className="w-screen my-12">
            <div className="flex gap-1 lg:gap-6">
                <p className="text-3xl">Trending</p>
                <div className="flex gap-2">
                    <Button
                        variant={isMovie ? "default" : "secondary"}
                        onClick={(e) => handleButtonClick(true, e)}
                    >
                        <Clapperboard className="mr-2 h-4 w-4" />
                        Movies
                    </Button>
                    <Button
                        variant={isMovie ? "secondary" : "default"}
                        onClick={(e) => handleButtonClick(false, e)}
                    >
                        <Tv className="mr-2 h-4 w-4" />
                        TV Shows
                    </Button>
                </div>
            </div>
            <div className="flex justify-center items-center max-w-screen-2xl mx-auto my-4">
                {loading ? (
                    <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                        {Array.from({ length: 20 }).map((_, index) => (
                            <CardSkeleton key={index} />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                        {content.map((item) => (
                            <div
                                key={item.id}
                                className="items-center justify-center flex flex-wrap rounded-lg transform transition-transform hover:scale-105"
                            >
                                {isMovie ? (
                                    <MovieCard
                                        title={(item as Movie).title}
                                        id={(item as Movie).id}
                                        imageLink={(item as Movie).poster_path}
                                        date={(item as Movie).release_date}
                                        vote={(item as Movie).vote_average}
                                        isMovie={true}
                                    />
                                ) : (
                                    <MovieCard
                                        title={(item as Shows).name}
                                        id={(item as Shows).id}
                                        imageLink={(item as Shows).poster_path}
                                        date={(item as Shows).first_air_date}
                                        vote={(item as Shows).vote_average}
                                        isMovie={false}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
