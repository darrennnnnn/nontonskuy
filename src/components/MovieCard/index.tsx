import Link from "next/link";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

interface CardProps {
    readonly title: string;
    readonly id: number;
    readonly imageLink: string;
    readonly date: string;
    readonly vote: string;
    readonly isMovie: boolean;
}

export default function MovieCard({
    title,
    id,
    imageLink,
    date,
    vote,
    isMovie,
}: CardProps) {
    const year = new Date(date).getFullYear();
    const roundedVote = parseFloat(vote).toFixed(1);

    const movieOrShowLink = isMovie ? "/movies" : "/shows";

    const imageUrl = `https://image.tmdb.org/t/p/w500/${imageLink}`;

    return (
        <div className=" border border-solid rounded-md w-60 p-2">
            <Link href={`${movieOrShowLink}/${id}`}>
                <Image src={imageUrl} alt={title} width={240} height={350} />
                <p className="line-clamp-1 mt-1 font-medium">{title}</p>
                <div className="flex justify-between">
                    <p className="text-muted-foreground text-xs">{year}</p>
                    <div className="flex items-center justify-center gap-1 text-muted-foreground">
                        <FaStar className="text-muted-foreground text-xs"/>
                        <p className="text-muted-foreground text-xs">{roundedVote}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}
