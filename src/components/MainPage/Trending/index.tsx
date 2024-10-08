"use client";

import { useEffect, useState } from "react";
import CardList from "@/components/Card/CardList";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Clapperboard, Tv } from "lucide-react";
import { Movie, Shows } from "@/lib/types";

export default function Trending() {
    const [content, setContent] = useState<(Movie | Shows)[]>([]);
    const [loading, setLoading] = useState(true);
    const [isMovie, setIsMovie] = useState(true);

    useEffect(() => {
        const fetchTrending = async () => {
            setLoading(true);
            try {
                const endpoint = isMovie ? "movie" : "tv";
                const response = await axios.get(
                    `/api/trending?type=${endpoint}`
                );
                setContent(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
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
        <div className="my-8">
            <div className="flex gap-3 items-center my-3">
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    Trending
                </h3>
                <div className="flex gap-2">
                    <Button
                        size={"sm"}
                        variant={isMovie ? "default" : "secondary"}
                        onClick={(e) => handleButtonClick(true, e)}
                    >
                        <Clapperboard className="mr-2 h-4 w-4" />
                        Movies
                    </Button>
                    <Button
                        size={"sm"}
                        variant={isMovie ? "secondary" : "default"}
                        onClick={(e) => handleButtonClick(false, e)}
                    >
                        <Tv className="mr-2 h-4 w-4" />
                        TV Shows
                    </Button>
                </div>
            </div>
            <div className="flex justify-center">
                <CardList
                    content={content}
                    isMovie={isMovie}
                    count={20}
                    loading={loading}
                />
            </div>
        </div>
    );
}
