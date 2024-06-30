import React from "react";

export default function Welcome() {
    return (
        <div className="flex-col flex justify-center text-center min-h-[65vh] px-4 md:px-10 lg:px-20">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold pb-4 tracking-tighter md:flex md:flex-col">
                Welcome to{" "}
                <span className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-transparent bg-clip-text font-black">
                    NONTONSKUY
                </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground line-clamp-5">
                Welcome to our movie list hub, where you can explore a diverse
                collection of films. Dive into a catalog spanning various
                genres, decades, and cultures. Whether you&apos;re a fan of
                classics, thrillers, or indie gems, our curated lists provide a
                glimpse into the rich tapestry of cinema. Browse through titles,
                read synopses, and plan your next movie night with our extensive
                movie list database.
            </p>
        </div>
    );
}
