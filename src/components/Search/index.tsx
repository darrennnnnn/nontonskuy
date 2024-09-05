"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Movie, Shows } from "@/lib/types";
import SearchSection from "./SearchSection";

interface SearchProps {
    searchStr: string;
}

export default function Search({ searchStr }: Readonly<SearchProps>) {
    const [movieContent, setMovieContent] = useState<Movie[]>([]);
    const [tvContent, setTvContent] = useState<Shows[]>([]);
    const [loading, setLoading] = useState(true);

    const [moviePage, setMoviePage] = useState(1);
    const [tvPage, setTvPage] = useState(1);

    const [movieTotalPages, setMovieTotalPages] = useState(0);
    const [tvTotalPages, setTvTotalPages] = useState(0);

    const searchQuery = decodeURIComponent(searchStr);

    useEffect(() => {
        const fetchTrending = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `/api/search?str=${searchQuery}&moviePage=${moviePage}&tvPage=${tvPage}`
                );
                setMovieContent(response.data.movies.results);
                setTvContent(response.data.tv.results);

                setMovieTotalPages(response.data.movies.total_pages);
                setTvTotalPages(response.data.tv.total_pages);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchTrending();
    }, [moviePage, tvPage, searchQuery]);

    const handleMoviePageChange = (pageNumber: number) => {
        setMoviePage(pageNumber);
    };

    const handleTvPageChange = (pageNumber: number) => {
        setTvPage(pageNumber);
    };

    return (
        <>
            <SearchSection
                title={`Movies Search Results for : ${searchQuery}`}
                content={movieContent}
                isMovie={true}
                loading={loading}
                currentPage={moviePage}
                totalPages={movieTotalPages}
                onPageChange={handleMoviePageChange}
            />
            <SearchSection
                title={`TV Shows Search Results for : ${searchQuery}`}
                content={tvContent}
                isMovie={false}
                loading={loading}
                currentPage={tvPage}
                totalPages={tvTotalPages}
                onPageChange={handleTvPageChange}
            />
        </>
    );
}
