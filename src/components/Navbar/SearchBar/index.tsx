import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { IoSearch } from "react-icons/io5";

export default function SearchBar() {
    const [route, setRoute] = useState("");
    const router = useRouter();

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push("/search/" + route);
        setRoute("");
    };

    return (
        <div className="transform transition-transform focus-within:scale-105">
            <form
                onSubmit={handleSubmit}
                className="flex items-center space-x-2"
            >
                <div className="relative flex items-center">
                    <IoSearch className="absolute left-5 text-sm font-medium leading-none text-muted-foreground" />
                </div>
                <Input
                    type="text"
                    placeholder="Search..."
                    value={route}
                    onChange={(e) => {
                        setRoute(e.target.value);
                    }}
                    className="pl-8"
                />
            </form>
        </div>
    );
}
