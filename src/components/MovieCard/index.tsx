import Image from "next/image";

interface CardProps {
    readonly title: string;
    readonly id: number;
    readonly imageLink: string;
    readonly date: string;
    readonly vote: string;
    readonly loading: boolean;
}

export default function MovieCard({
    title,
    id,
    imageLink,
    date,
    vote,
    loading,
}: CardProps) {
    if (loading) {
        return (
            <div className="min-w-60 min-h-96 px-2 py-4 md:max-w-60 bg-slate-900 rounded-md flex flex-col justify-between animate-pulse">
                <div className="aspect-w-2 aspect-h-3"></div>
                <div className="flex flex-col justify-end h-60">
                    <div className="text-lg font-semibold pt-3 bg-gray-700 h-6 w-3/4 rounded-md mb-2"></div>
                    <p className="text-sm text-muted-foreground bg-gray-700 h-4 w-1/2 rounded-md"></p>
                </div>
            </div>
        );
    }
    return (
        <div className="min-w-60 min-h-96 px-2 py-4 md:max-w-60 bg-slate-900 rounded-md">
            <Image
                src={`https://image.tmdb.org/t/p/w500/${imageLink}`}
                alt="spider"
                width={0}
                height={0}
                sizes="100vh"
                style={{ width: "100%", height: "auto" }}
                className="rounded-lg"
            />
            <div className="text-lg font-semibold pt-3 overflow-hidden line-clamp-1">
                {title}
            </div>
            <p className="text-sm text-muted-foreground">{date}</p>
        </div>
    );
}
