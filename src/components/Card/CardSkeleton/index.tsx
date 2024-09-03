import React from "react";
import { Skeleton } from "../../ui/skeleton";

export default function CardSkeleton() {
    return (
        <div className="border border-solid rounded-md w-44 p-2">
            <Skeleton className="w-[159px] h-[238px]" />
            <Skeleton className="h-4 w-[150px] mt-1" />
            <div className="flex justify-between mt-1">
                <Skeleton className="h-4 w-[50px]" />
                <Skeleton className="h-4 w-[50px]" />
            </div>
        </div>
    );
}
