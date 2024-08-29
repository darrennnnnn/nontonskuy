"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import Image from "next/image";
import SimilarShow from "@/components/SimilarShow";
import { LoaderCircle } from "lucide-react";
import { ShowDetails } from "@/lib/types";

//
export default function ShowInfo({
    params,
}: {
    readonly params: { showsId: string };
}) {
    const [details, setDetails] = useState<ShowDetails | null>(null);
    const [loading, setLoading] = useState(true);

    const id = params.showsId;

    const runtimeInMinutes = details?.episode_run_time || 0;

    const hours = Math.floor(runtimeInMinutes / 60);
    const minutes = runtimeInMinutes % 60;

    const formattedRuntime = `${hours}h ${minutes}m`;

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await axios.get(`/api/shows/details?id=${id}`);
                setDetails(response.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        setLoading(true);
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
        <div className="flex flex-col justify-center items-center">
            <div className="flex items-center justify-center w-full">
                <SimilarShow id={id} />
            </div>
            {/* <div
                className="flex items-center flex-col py-10 relative"
                style={{
                    minHeight: "400px",
                }}
            >
                <div
                    className="absolute inset-0 bg-black opacity-30"
                    style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original/${details?.backdrop_path})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                <div className="flex justify-center w-3/4 gap-6 relative z-10">
                    {details && details.poster_path && (
                        <div className="relative w-96 h-auto">
                            <Image
                                src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`}
                                alt={details.name}
                                width={500}
                                height={750}
                            />
                        </div>
                    )}
                    <div className="flex flex-col w-full">
                        <div className="flex items-center gap-2">
                            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                                {details?.name}
                            </h1>
                            <h1 className="scroll-m-20 text-2xl font-medium tracking-tight lg:text-3xl">
                                {" "}
                                ({details?.first_air_date.slice(0, 4)})
                            </h1>
                        </div>
                        <h4>
                            {details?.first_air_date} &#x2022;{" "}
                            {formattedRuntime}
                        </h4>
                        <div className="flex gap-1 my-3">
                            {details?.genres.map((genre) => (
                                <Badge key={genre.id}>{genre.name}</Badge>
                            ))}
                        </div>
                        <blockquote className="mt-6 border-l-2 pl-6 italic">
                            {details?.tagline}
                        </blockquote>
                        <div className="my-4">
                            <p className="text-lg font-bold">Overview</p>
                            <p className="text-justify font-light">
                                {details?.overview}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center w-3/4">
                <SimilarShow id={params.showsId} />
            </div> */}
        </div>
    );
}
