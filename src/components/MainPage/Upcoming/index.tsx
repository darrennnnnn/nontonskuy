"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Movie } from "@/lib/types";
import SkeletonList from "@/components/SkeletonList";
import CardList from "@/components/CardList";

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
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight my-3">
                Coming Soon
            </h3>
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
