"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Movie } from "@/lib/types";
import CardList from "@/components/Card/CardList";

export default function Upcoming() {
    const [content, setContent] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUpcoming = async () => {
            setLoading(true);
            try {
                const response = await axios.get("/api/upcoming");
                setContent(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchUpcoming();
    }, []);

    return (
        <div className="my-8">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight my-3">
                Coming Soon
            </h3>
            <div className="flex justify-center">
                <CardList
                    content={content}
                    isMovie={true}
                    count={20}
                    loading={loading}
                />
            </div>
        </div>
    );
}
