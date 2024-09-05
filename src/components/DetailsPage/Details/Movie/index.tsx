"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import Image from "next/image";
import { LoaderCircle } from "lucide-react";
import { MovieDetails } from "@/lib/types";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { formatDate } from "@/lib/date";

interface DetailsProps {
    id: number;
}

export default function MovieDetailsComponent({ id }: { readonly id: number }) {
    const [details, setDetails] = useState<MovieDetails | null>(null);
    const [loading, setLoading] = useState(true);

    const runtimeInMinutes = details?.runtime ?? 0;
    const hours = Math.floor(runtimeInMinutes / 60);
    const minutes = runtimeInMinutes % 60;
    const formattedRuntime = `${hours}h ${minutes}m`;
    const roundedVote = details?.vote_average.toFixed(1);

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            try {
                const movieResponse = await axios.get(
                    `/api/movie/details?id=${id}`
                );
                setDetails(movieResponse.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <LoaderCircle className="animate-spin w-20 h-20" />
            </div>
        );
    }

    return (
        <div
            className="h-[600px] relative flex justify-end flex-col w-full p-6 bg-cover bg-no-repeat"
            style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${details?.backdrop_path})`,
                backgroundPosition: "center",
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--overlay-dark)] via-[var(--overlay-light)] to-[var(--overlay-dark)] opacity-100"></div>
            <div className="relative z-10 h-full flex items-end p-5">
                <div className="relative h-full flex-shrink-0">
                    <Image
                        src={`https://image.tmdb.org/t/p/w500/${details?.poster_path}`}
                        alt={details?.title ?? ""}
                        width={1000}
                        height={0}
                        className="h-full w-auto rounded-md"
                    />
                </div>
                <div className="w-full h-full ml-5 flex flex-col justify-center">
                    <div className="">
                        <div className="flex items-center gap-2">
                            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
                                {details?.title}
                            </h1>
                            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                                &#40;{details?.release_date.slice(0, 4)}
                                &#41;
                            </h3>
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center gap-1">
                                <FaStar />
                                <p className="leading-7">{roundedVote}</p>
                            </div>

                            <div>
                                <p className="leading-7">
                                    {details?.release_date
                                        ? formatDate(details.release_date)
                                        : "Date not available"}{" "}
                                    &#x2022; {formattedRuntime}
                                </p>
                            </div>
                        </div>
                        <blockquote className="my-4 border-l-2 pl-6 italic">
                            {details?.tagline}
                        </blockquote>
                        <div className="flex gap-3">
                            {details?.genres.map((genre) => (
                                <Link
                                    href={`/genre/${genre.name.toLowerCase()}`}
                                    key={genre.id}
                                >
                                    <Badge>{genre.name}</Badge>
                                </Link>
                            ))}
                        </div>
                        <div className="mt-4">
                            <h4 className="scroll-m-20 text-xl font-bold tracking-tight">
                                Overview
                            </h4>
                            <p className="leading-7">{details?.overview}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
