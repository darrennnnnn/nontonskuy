"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa";

export function BackButton() {
    const router = useRouter();
    return (
        <Button variant="outline" onClick={() => router.back()}>
            <div className="flex items-center justify-center gap-2">
                <FaChevronLeft className="h-3 w-3" />
                <p>Back</p>
            </div>
        </Button>
    );
}
