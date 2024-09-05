import TopRated from "@/components/TopRatedPage/TopRated";

export default function ShowsPage() {
    return (
        <div className="flex items-center flex-col max-w-screen-2xl mx-auto">
            <TopRated isMovie={false}/>
        </div>
    );
}
