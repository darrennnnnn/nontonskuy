"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Movie, SimilarProps } from "@/lib/types";
import SkeletonList from "../SkeletonList";
import CardList from "../CardList";

export default function SimilarMovie({ id }: Readonly<SimilarProps>) {
    const [similar, setSimilar] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSimilar = async () => {
            try {
                const response = await axios.get(`/api/similarmovie?id=${id}`);
                setSimilar(response.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        setLoading(true);
        fetchSimilar();
    }, [id]);

    return (
        <div className="my-8">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight my-3">
                Similar Movies
            </h3>
            <div className="flex justify-center">
                {loading ? (
                    <SkeletonList count={20} />
                ) : (
                    <CardList content={similar} isMovie={true} />
                )}
            </div>
        </div>
    );
}
