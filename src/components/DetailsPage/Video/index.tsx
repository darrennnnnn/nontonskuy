"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { LoaderCircle } from "lucide-react";
import { Videos } from "@/lib/types";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface VideoProps {
    id: number;
    isMovie: boolean;
}

export default function Video({ id, isMovie }: Readonly<VideoProps>) {
    const [video, setVideo] = useState<Videos[] | null>(null);
    const [loading, setLoading] = useState(true);

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
                const videoResponse = await axios.get(
                    `/api/video?id=${id}&type=${isMovie ? "movie" : "tv"}`
                );
                setVideo(videoResponse.data.results);
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
    );
}
