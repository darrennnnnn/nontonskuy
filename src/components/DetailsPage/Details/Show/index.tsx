"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import Image from "next/image";
import { LoaderCircle } from "lucide-react";
import { ShowDetails } from "@/lib/types";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { formatDate } from "@/lib/date";

interface DetailsProps {
    id: number;
}

export default function ShowDetailsComponent({ id }: Readonly<DetailsProps>) {
    const [details, setDetails] = useState<ShowDetails | null>(null);
    const [loading, setLoading] = useState(true);

    const roundedVote = details?.vote_average.toFixed(1);

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            try {
                const showResponse = await axios.get(
                    `/api/shows/details?id=${id}`
                );
                setDetails(showResponse.data);
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
                        alt={details?.name ?? ""}
                        width={1000}
                        height={0}
                        className="h-full w-auto rounded-md"
                    />
                </div>
                <div className="w-full h-full ml-5 flex flex-col justify-center">
                    <div className="">
                        <div className="flex items-center gap-2">
                            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
                                {details?.name}
                            </h1>
                            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                                &#40;{details?.first_air_date.slice(0, 4)}
                                &#41;
                            </h3>
                        </div>
                        <h4 className="scroll-m-20 text-xl font-bold tracking-tight">
                            {details?.number_of_seasons} Seasons &#x2022;{" "}
                            {details?.number_of_episodes} Episodes
                        </h4>
                        <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center gap-1">
                                <FaStar />
                                <p className="leading-7">{roundedVote}</p>
                            </div>

                            <div>
                                <p className="leading-7">
                                    {details?.first_air_date
                                        ? formatDate(details.first_air_date)
                                        : "Date not available"}
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
