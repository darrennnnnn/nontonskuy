import Trending from "@/components/Trending";
import Upcoming from "@/components/Upcoming";
import { PlayingNow } from "@/components/PlayingNow";

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
