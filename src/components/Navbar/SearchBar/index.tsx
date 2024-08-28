import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function SearchBar() {
    const [route, setRoute] = useState("");
    const router = useRouter();

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push("/search/" + route);
    };

    return (
        <div className="transform transition-transform focus-within:scale-105">
            <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    placeholder="Search..."
                    value={route}
                    onChange={(e) => {
                        setRoute(e.target.value);
                    }}
                />
            </form>
        </div>
    );
}
