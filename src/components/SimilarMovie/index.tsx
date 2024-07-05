"use client";

import { useEffect, useState } from "react";
import MovieCard from "../MovieCard";
import axios from "axios";
import CardSkeleton from "../CardSkeleton";

interface SimilarMovie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    vote_average: string;
}

interface SimilarProps {
    readonly id: string;
}

export default function SimilarMovie({ id }: SimilarProps) {
    const [similar, setSimilar] = useState<SimilarMovie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSimilar = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/372058/recommendations?api_key=298159914b2ce37be28ba2eca317b6f3&language=en-US`
                );
                setSimilar(response.data.results);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        setLoading(true);
        fetchSimilar();
    }, [id]);

    const renderContent = () => {
        if (loading) {
            return (
                <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                    {Array.from({ length: 20 }).map((_, index) => (
                        <CardSkeleton key={index} />
                    ))}
                </div>
            );
        } else if (similar.length === 0) {
            return <p>No Similar Movies Found</p>;
        } else {
            return (
                <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                    {similar.map((item) => (
                        <div
                            key={item.id}
                            className="items-center justify-center flex flex-wrap rounded-lg transform transition-transform hover:scale-105"
                        >
                            <MovieCard
                                title={item.title}
                                id={item.id}
                                imageLink={item.poster_path}
                                date={item.release_date}
                                vote={item.vote_average}
                                isMovie={true}
                            />
                        </div>
                    ))}
                </div>
            );
        }
    };

    return (
        <div className="w-screen my-12">
            <div className="flex gap-1 lg:gap-6">
                <p className="text-3xl">Similar</p>
            </div>
            <div className="flex justify-center items-center max-w-screen-2xl mx-auto my-4">
                {renderContent()}
            </div>
        </div>
    );
}
