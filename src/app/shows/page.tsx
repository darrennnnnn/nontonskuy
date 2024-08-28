"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import MovieCard from "@/components/MovieCard";
import { Shows } from "@/lib/types";

export default function ShowsPage() {
    const [content, setContent] = useState<Shows[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 20;

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/shows?page=${page}`);
                setContent(response.data.results);
                setTotalPages(response.data.total_pages);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };

        fetchMovies();
    }, [page]);

    const handlePageChange = (pageNumber: number) => {
        setPage(pageNumber);
    };

    const renderPaginationItems = () => {
        const maxPageButtons = 4;
        const pages = [];

        let startPage = Math.max(1, page - Math.floor(maxPageButtons / 2));
        let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

        if (endPage - startPage < maxPageButtons - 1) {
            startPage = Math.max(1, endPage - maxPageButtons + 1);
        }

        if (startPage > 1) {
            pages.push(
                <PaginationItem key={1}>
                    <PaginationLink onClick={() => handlePageChange(1)}>
                        1
                    </PaginationLink>
                </PaginationItem>
            );

            if (startPage > 2) {
                pages.push(
                    <PaginationItem key="ellipsis-start">
                        <PaginationEllipsis />
                    </PaginationItem>
                );
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <PaginationItem key={i}>
                    <PaginationLink
                        onClick={() => handlePageChange(i)}
                        isActive={i === page}
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push(
                    <PaginationItem key="ellipsis-end">
                        <PaginationEllipsis />
                    </PaginationItem>
                );
            }

            pages.push(
                <PaginationItem key={totalPages}>
                    <PaginationLink
                        onClick={() => handlePageChange(totalPages)}
                    >
                        {totalPages}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        return pages;
    };

    return (
        <div className="w-full my-10">
            <div className="flex pb-4 items-center">
                <h2 className="pb-1 text-xl lg:text-3xl font-semibold px-2 lg:pl-[13rem] pr-4">
                    Top Rated Shows
                </h2>
            </div>
            <div className="border-b"></div>
            <div className="pt-3 md:px-10 flex justify-center items-center gap-2 md:gap-4 flex-wrap">
                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-1 lg:gap-4">
                        {[...Array(itemsPerPage)].map((_, index) => (
                            <div
                                key={index}
                                className="min-w-60 min-h-96 px-2 py-4 md:max-w-60 bg-slate-900 rounded-md flex flex-col justify-between animate-pulse"
                            >
                                <div className="aspect-w-2 aspect-h-3"></div>
                                <div className="flex flex-col justify-end h-60">
                                    <div className="text-lg font-semibold pt-3 bg-gray-700 h-6 w-3/4 rounded-md mb-2"></div>
                                    <p className="text-sm text-muted-foreground bg-gray-700 h-4 w-1/2 rounded-md"></p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-1 lg:gap-4">
                        {content.map((item) => (
                            <div key={item.id}>
                                <MovieCard
                                    title={item.name}
                                    id={item.id}
                                    imageLink={item.poster_path}
                                    date={item.first_air_date}
                                    vote={item.vote_average}
                                    isMovie={false}
                                />
                            </div>
                        ))}
                    </div>
                )}
                <div className="mt-4 flex justify-center items-center">
                    <Pagination>
                        <PaginationContent>
                            {page > 1 && (
                                <PaginationItem>
                                    <PaginationPrevious
                                        href="#"
                                        onClick={() =>
                                            handlePageChange(page - 1)
                                        }
                                    />
                                </PaginationItem>
                            )}
                            {renderPaginationItems()}
                            {page < totalPages && (
                                <PaginationItem>
                                    <PaginationNext
                                        href="#"
                                        onClick={() =>
                                            handlePageChange(page + 1)
                                        }
                                    />
                                </PaginationItem>
                            )}
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
    );
}
