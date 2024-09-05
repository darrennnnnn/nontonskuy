"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import PaginationComponent from "../Pagination";
import { Shows } from "@/lib/types";
import CardList from "@/components/Card/CardList";

export default function TopRated({ isMovie }: { readonly isMovie: boolean }) {
    const [content, setContent] = useState<Shows[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `/api/${isMovie ? "movie" : "shows"}?page=${page}`
                );
                setContent(response.data.results);
                setTotalPages(response.data.total_pages);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
    }, [page, isMovie]);

    const handlePageChange = (pageNumber: number) => {
        setPage(pageNumber);
    };

    return (
        <div className="my-8">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight my-3">
                Top Rated {isMovie ? "Movies" : "Shows"}
            </h3>
            <div className="flex justify-center">
                <CardList
                    content={content}
                    isMovie={isMovie}
                    count={20}
                    loading={loading}
                />
            </div>
            <div className="mt-4 flex justify-center items-center">
                <PaginationComponent
                    page={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
}
