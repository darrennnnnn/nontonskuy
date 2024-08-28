"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Movie } from "@/lib/types";
import SkeletonList from "../SkeletonList";
import CardList from "../CardList";

export default function Upcoming() {
    const [content, setContent] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUpcoming = async () => {
            try {
                const response = await axios.get("/api/upcoming");
                setContent(response.data);
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
        <div className="my-8">
            <p className="text-2xl my-2">Upcoming</p>
            <div className="flex justify-center">
                {loading ? (
                    <SkeletonList count={20} />
                ) : (
                    <CardList content={content} isMovie={true} />
                )}
            </div>
        </div>
    );
}
