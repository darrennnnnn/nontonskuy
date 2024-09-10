import TopRated from "@/components/TopRatedPage";

export default function MoviePage() {
    return (
        <div className="flex items-center flex-col max-w-screen-2xl mx-auto">
            <TopRated isMovie={true} />
        </div>
    );
}
