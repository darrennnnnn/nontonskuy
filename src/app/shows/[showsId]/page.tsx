import Video from "@/components/DetailsPage/Video";
import SimilarShow from "@/components/SimilarShow";
import ShowDetailsComponent from "@/components/DetailsPage/Details/Show";
import ShowSeasons from "@/components/DetailsPage/Details/Show/ShowSeasons";

export default function ShowInfo({
    params,
}: {
    readonly params: { showsId: number };
}) {
    const id = params.showsId;

    return (
        <div className="flex items-center flex-col max-w-screen-2xl mx-auto">
            <ShowDetailsComponent id={id} />
            <ShowSeasons id={id}/>
            <Video id={id} isMovie={false} />
            <div className="flex items-center justify-center w-full">
                <SimilarShow id={id} />
            </div>
        </div>
    );
}
