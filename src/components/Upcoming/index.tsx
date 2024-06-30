"use client";

import { useEffect, useState } from "react";
import MovieCard from "../MovieCard";
import axios from "axios";
import CardSkeleton from "../CardSkeleton";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    vote_average: string;
}

export default function Upcoming() {
    const [content, setContent] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUpcoming = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/upcoming?api_key=298159914b2ce37be28ba2eca317b6f3&region=US`
                );
                setContent(response.data.results);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        setLoading(true);
        fetchUpcoming();
    }, []);

    return (
        <div className="w-screen my-12">
            <div className="flex gap-1 lg:gap-6">
                <p className="text-3xl">Upcoming</p>
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
                                <MovieCard
                                    title={(item).title}
                                    id={(item).id}
                                    imageLink={(item).poster_path}
                                    date={(item).release_date}
                                    vote={(item).vote_average}  
                                    isMovie={true}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
