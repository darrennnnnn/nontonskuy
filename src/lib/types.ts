export interface Shows {
    id: number;
    name: string;
    poster_path: string;
    first_air_date: string;
    vote_average: string;
    overview: string;
    backdrop_path: string;
    genre_ids: { id: number }[];
    vote_count: string;
}

export interface ShowDetails {
    id: number;
    name: string;
    poster_path: string;
    first_air_date: string;
    vote_average: string;
    overview: string;
    episode_run_time: number;
    genres: { id: number; name: string }[];
    tagline: string;
    backdrop_path: string;
}

export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    vote_average: string;
    overview: string;
    backdrop_path: string;
    genre_ids: { id: number }[];
    vote_count: string;
}

export interface MovieDetails {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    vote_average: string;
    overview: string;
    runtime: number;
    genres: { id: number; name: string }[];
    tagline: string;
    backdrop_path: string;
}

export interface SkeletonListProps {
    count: number;
}

export interface SimilarProps {
    id: string;
}

export interface CardProps {
    title: string;
    id: number;
    imageLink: string;
    date: string;
    vote: string;
    isMovie: boolean;
}

export interface CardListProps {
    content: (Movie | Shows)[];
    isMovie: boolean;
}
