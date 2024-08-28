import { SkeletonListProps } from "@/lib/types";
import CardSkeleton from "../CardSkeleton";

export default function SkeletonList({ count }: Readonly<SkeletonListProps>) {
    return (
        <div className="inline-grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {Array.from({ length: count }).map((_, index) => (
                <CardSkeleton key={index} />
            ))}
        </div>
    );
}
