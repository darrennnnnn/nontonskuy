import Welcome from "@/components/Welcome";
import Trending from "@/components/Trending";
import Upcoming from "@/components/Upcoming";

export default function Home() {
    return (
        <main className="flex items-center flex-col">
            <div className="flex justify-center w-3/4">
                <Welcome />
            </div>
            <div className="flex items-center justify-center w-3/4">
                <Trending />
            </div>
            <div className="flex items-center justify-center w-3/4">
                <Upcoming />
            </div>
        </main>
    );
}
