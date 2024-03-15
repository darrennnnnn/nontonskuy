import Welcome from "@/components/Welcome";
import Trending from "../components/Trending";
import Upcoming from "@/components/Upcoming";

export default function Home() {
    return (
        <main>
            <div>
                <div className="flex justify-center">
                    <Welcome />
                </div>
                <div className="flex justify-center">
                    <Trending />
                </div>
                <div className="flex justify-center">
                    <Upcoming />
                </div>
            </div>
        </main>
    );
}
