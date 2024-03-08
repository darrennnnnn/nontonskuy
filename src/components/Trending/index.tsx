"use client";

import { useEffect, useState } from "react";
import MovieCard from "../MovieCard";
import axios from "axios";
import { Button } from "../ui/button";
import { Clapperboard } from "lucide-react";

interface Movie {
    id: number;
    original_title: string;
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
        <div>
            <div className="flex pb-4 gap-4">
                <h2 className="scroll-m-20 pb-1 text-3xl font-semibold tracking-tight first:mt-0 px-6 md:px-12">
                    Trending
                </h2>
                <div className="flex gap-4">
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
                        <Clapperboard className="mr-2 h-4 w-4" />
                        TV Shows
                    </Button>
                </div>
            </div>
            <div className="border-b"></div>
            <div className="px-4 pt-3 md:px-10 flex justify-center items-center gap-2 md:gap-4 flex-wrap">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    content.map((item) => (
                        <div key={item.id}>
                            {isMovie ? (
                                <MovieCard
                                    title={(item as Movie).original_title}
                                    id={(item as Movie).id}
                                    imageLink={(item as Movie).poster_path}
                                    date={(item as Movie).release_date}
                                    vote={(item as Movie).vote_average}
                                    loading={loading}
                                />
                            ) : (
                                <MovieCard
                                    title={(item as Shows).name}
                                    id={(item as Shows).id}
                                    imageLink={(item as Shows).poster_path}
                                    date={(item as Shows).first_air_date}
                                    vote={(item as Shows).vote_average}
                                    loading={loading}
                                />
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
