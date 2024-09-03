"use client";

import axios from "axios";
import Image from "next/image";
import { formatDate } from "@/lib/date";
import { Episode, ShowDetails } from "@/lib/types";
import { useState, useEffect } from "react";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";

interface ShowSeasonsProps {
    id: number;
}

export default function ShowSeasons({ id }: Readonly<ShowSeasonsProps>) {
    const [details, setDetails] = useState<ShowDetails | null>(null);
    const [seasonDetails, setSeasonDetails] = useState<Episode[] | null>(null);
    const [selectedSeason, setSelectedSeason] = useState<number>(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const seasonResponse = await axios.get(
                    `/api/shows/details/seasons?id=${id}&season=${selectedSeason}`
                );
                const showResponse = await axios.get(
                    `/api/shows/details?id=${id}`
                );
                setSeasonDetails(seasonResponse.data);
                console.log(seasonResponse.data);
                setDetails(showResponse.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        setLoading(true);
        fetchDetails();
    }, [id, selectedSeason]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <LoaderCircle className="animate-spin w-20 h-20" />
            </div>
        );
    }

    const handleButtonClick = (season: number) => {
        setSelectedSeason(season);
        console.log(season);
    };

    return (
        <div className="w-full p-8">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-3">
                Seasons & Episodes
            </h3>
            <ScrollArea className="w-full whitespace-nowrap rounded-md border-none">
                <div className="flex w-max space-x-4 p-4">
                    {details?.seasons.map((season) => (
                        <HoverCard key={season.id}>
                            <HoverCardTrigger asChild>
                                <Button
                                    size="sm"
                                    variant={
                                        season.season_number === selectedSeason
                                            ? "default"
                                            : "secondary"
                                    }
                                    onClick={() =>
                                        handleButtonClick(season.season_number)
                                    }
                                    className="overflow-hidden rounded-md"
                                >
                                    {`Season ${season.season_number}`}
                                </Button>
                            </HoverCardTrigger>
                            <HoverCardContent>
                                {season.episode_count === 0 ? (
                                    <div>No Content Found</div>
                                ) : (
                                    <div className="flex flex-col justify-between items-center">
                                        <p className="text-sm font-bold">
                                            {season.name}
                                        </p>
                                        <Image
                                            src={`https://image.tmdb.org/t/p/w500/${season.poster_path}`}
                                            alt={season.name}
                                            width={240}
                                            height={350}
                                            className="aspect-[2/3] my-1"
                                        />
                                        <small className="text-sm font-medium leading-none">
                                            {`Episodes : ${season.episode_count}`}
                                        </small>
                                    </div>
                                )}
                            </HoverCardContent>
                        </HoverCard>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>

            {seasonDetails?.length ? (
                <ScrollArea className="w-full whitespace-normal rounded-md border h-96">
                    <div className="flex w-max space-x-4 p-4">
                        <div className="flex flex-col gap-3">
                            {seasonDetails.map((item) => (
                                <div key={item.id} className="flex gap-3">
                                    <Image
                                        src={`https://image.tmdb.org/t/p/w500/${item.still_path}`}
                                        alt={item.name}
                                        width={300}
                                        height={350}
                                        className="aspect-[16/9] my-1 rounded-md"
                                    />
                                    <div className="flex flex-col justify-evenly max-w-screen-lg">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <div className="text-lg font-semibold">
                                                    Episode{" "}
                                                    {item.episode_number}
                                                </div>
                                                &#x2022;
                                                <p>{item.name}</p>
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                {item.runtime} min
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {formatDate(item.air_date)}
                                            </p>
                                        </div>
                                        <div>
                                            <small className="text-sm font-medium leading-none">
                                                {item.overview}
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </ScrollArea>
            ) : (
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    ❗No Content Found❗
                </h3>
            )}
        </div>
    );
}
