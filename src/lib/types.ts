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
    vote_average: number;
    overview: string;
    genres: { id: number; name: string }[];
    tagline: string;
    backdrop_path: string;
    status: string;
    number_of_seasons: number;
    number_of_episodes: number;
    seasons: Season[];
}
export interface MovieDetails {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    overview: string;
    runtime: number;
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

export interface SkeletonListProps {
    count: number;
}

export interface SimilarProps {
    id: number;
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
    count: number;
    loading: boolean;
}

export interface Videos {
    official: boolean;
    site: string;
    key: string;
    name: string;
    type: string;
}

export interface Season {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
    vote_average: number;
}

export interface Episode {
    air_date: string;
    episode_number: number;
    name: string;
    id: number;
    overview: string;
    runtime: number;
    season_number: number;
    still_path: string;
    vote_average: number;
}
