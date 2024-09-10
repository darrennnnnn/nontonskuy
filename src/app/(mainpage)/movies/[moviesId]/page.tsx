import Video from "@/components/DetailsPage/Video";
import MovieDetailsComponent from "@/components/DetailsPage/Details/Movie";
import SimilarMovie from "@/components/SimilarMovie";

export default function MovieInfoPage({
    params,
}: {
    readonly params: { moviesId: number };
}) {
    const id = params.moviesId;

    return (
        <div className="flex items-center flex-col max-w-screen-2xl mx-auto">
            <MovieDetailsComponent id={id} />
            <Video id={id} isMovie={true} />
            <div className="flex items-center justify-center w-full">
                <SimilarMovie id={id} />
            </div>
        </div>
    );
}
