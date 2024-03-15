"use client";

import { useEffect, useState } from "react";

export default function MovieInfo({
    params,
}: {
    readonly params: { moviesId: string };
}) {
    const [details, setDetails] = useState([]);

    useEffect(() => {}, []);
    return (
        <div>
            pager {params.moviesId} <h2>HI</h2>
        </div>
    );
}
