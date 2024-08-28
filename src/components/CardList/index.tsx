import { Movie, Shows, CardListProps } from "@/lib/types";
import MovieCard from "../MovieCard";

export default function CardList({
    content,
    isMovie,
}: Readonly<CardListProps>) {
    return (
        <div className="inline-grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {content.map((item) => (
                <div key={item.id}>
                    {isMovie ? (
                        <MovieCard
                            title={(item as Movie).title}
                            id={(item as Movie).id}
                            imageLink={(item as Movie).poster_path}
                            date={(item as Movie).release_date}
                            vote={(item as Movie).vote_average}
                            isMovie={true}
                        />
                    ) : (
                        <MovieCard
                            title={(item as Shows).name}
                            id={(item as Shows).id}
                            imageLink={(item as Shows).poster_path}
                            date={(item as Shows).first_air_date}
                            vote={(item as Shows).vote_average}
                            isMovie={false}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}
