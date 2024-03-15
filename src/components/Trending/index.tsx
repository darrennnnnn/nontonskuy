"use client";

import { useEffect, useState } from "react";
import MovieCard from "../MovieCard";
import axios from "axios";
import { Button } from "../ui/button";
import { Clapperboard, Tv } from "lucide-react";

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

export default function Upcoming() {
    const [content, setContent] = useState<(Movie | Shows)[]>([]);
    const [loading, setLoading] = useState(true);
    const [isMovie, setIsMovie] = useState(true);

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                const endpoint = isMovie ? "movie" : "tv";
                const response = await axios.get(
                    `https://api.themoviedb.org/3/trending/${endpoint}/week?api_key=${process.env.API_KEY}`
                );
                setContent(response.data.results);
                setLoading(false);
            } catch (error) {
                console.log(error);
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
        <div className="w-full mb-10">
            <div className="flex pb-4 items-center">
                <h2 className="pb-1 text-xl lg:text-3xl font-semibold px-2 lg:pl-[13rem] pr-4 ">
                    Trending
                </h2>
                <div className="flex gap-1 lg:gap-2">
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
            <div className="border-b"></div>
            <div className="pt-3 md:px-10 flex justify-center items-center gap-2 md:gap-4 flex-wrap">
                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-1 lg:gap-4">
                        {[...Array(20)].map((_, index) => (
                            <div
                                key={index}
                                className="min-w-60 min-h-96 px-2 py-4 md:max-w-60 bg-slate-900 rounded-md flex flex-col justify-between animate-pulse"
                            >
                                <div className="aspect-w-2 aspect-h-3"></div>
                                <div className="flex flex-col justify-end h-60">
                                    <div className="text-lg font-semibold pt-3 bg-gray-700 h-6 w-3/4 rounded-md mb-2"></div>
                                    <p className="text-sm text-muted-foreground bg-gray-700 h-4 w-1/2 rounded-md"></p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-1 lg:gap-4">
                        {content.map((item) => (
                            <div key={item.id}>
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
