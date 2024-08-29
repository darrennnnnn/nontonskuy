"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import Image from "next/image";
import SimilarMovie from "@/components/SimilarMovie";
import { LoaderCircle } from "lucide-react";
import { MovieDetails, Videos } from "@/lib/types";
import Link from "next/link";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export default function MovieInfo({
    params,
}: {
    readonly params: { moviesId: string };
}) {
    const [details, setDetails] = useState<MovieDetails | null>(null);
    const [video, setVideo] = useState<Videos[] | null>(null);
    const [loading, setLoading] = useState(true);

    const id = params.moviesId;
    const runtimeInMinutes = details?.runtime ?? 0;
    const hours = Math.floor(runtimeInMinutes / 60);
    const minutes = runtimeInMinutes % 60;
    const formattedRuntime = `${hours}h ${minutes}m`;

    const filteredVideo = video
        ? video.filter(
              (item) =>
                  item.official === true &&
                  item.site.toLowerCase() === "youtube"
          )
        : [];

    const usableVideo = filteredVideo.toReversed();

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const movieResponse = await axios.get(
                    `/api/movie/details?id=${id}`
                );
                const videoResponse = await axios.get(`/api/video?id=${id}`);
                setDetails(movieResponse.data);
                setVideo(videoResponse.data.results);
                setLoading(false);
                console.log(videoResponse.data.results);
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
        <div className="flex items-center flex-col max-w-screen-2xl mx-auto ">
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
                            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
                                {details?.title}
                            </h1>
                            <p className="leading-7">
                                {details?.release_date} &#x2022;{" "}
                                {formattedRuntime}
                            </p>
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
            <div className="my-8">
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mx-4 my-3">
                    Videos
                </h3>
                <ScrollArea className="w-[1500px] whitespace-nowrap rounded-md border">
                    <div className="flex w-max space-x-2 p-4">
                        {usableVideo.map((item) => (
                            <Dialog key={item.key}>
                                <DialogTrigger asChild>
                                    <figure className="shrink-0 cursor-pointer">
                                        <div className="overflow-hidden rounded-md">
                                            <Image
                                                src={`https://img.youtube.com/vi/${item.key}/maxresdefault.jpg`}
                                                alt={item.name}
                                                className="aspect-[16/9] h-fit w-fit object-cover"
                                                width={300}
                                                height={400}
                                            />
                                        </div>
                                        <figcaption className="pt-2 text-xs text-muted-foreground">
                                            {item.type}
                                            <span className="font-semibold text-foreground block w-[400px] truncate overflow-hidden">
                                                {item.name}
                                            </span>
                                        </figcaption>
                                    </figure>
                                </DialogTrigger>
                                <DialogContent className="max-w-screen-2xl">
                                    <DialogHeader>
                                        <DialogTitle>{item.name}</DialogTitle>
                                        <DialogDescription>
                                            <iframe
                                                className="w-full aspect-[16/9]"
                                                title={item.name}
                                                src={`https://www.youtube.com/embed/${item.key}`}
                                            />
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
            <div className="flex items-center justify-center w-full">
                <SimilarMovie id={id} />
            </div>
        </div>
    );
}
