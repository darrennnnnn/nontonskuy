import Trending from "@/components/MainPage/Trending";
import Upcoming from "@/components/MainPage/Upcoming";
import { PlayingNow } from "@/components/MainPage/PlayingNow";

export default function Home() {
    return (
        <main className="flex items-center flex-col max-w-screen-2xl mx-auto">
            <div>
                <PlayingNow />
            </div>
            <div>
                <Trending />
            </div>
            <div>
                <Upcoming />
            </div>
        </main>
    );
}
