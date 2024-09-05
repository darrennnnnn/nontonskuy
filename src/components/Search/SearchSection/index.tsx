import CardList from "@/components/Card/CardList";
import PaginationComponent from "@/components/Pagination";
import { Movie, Shows } from "@/lib/types";

interface SearchSectionProps {
    title: string;
    content: Movie[] | Shows[];
    isMovie: boolean;
    loading: boolean;
    currentPage: number;
    totalPages: number;
    onPageChange: (pageNumber: number) => void;
}

export default function SearchSection({
    title,
    content,
    isMovie,
    loading,
    currentPage,
    totalPages,
    onPageChange,
}: Readonly<SearchSectionProps>) {
    return (
        <div className="my-8">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight my-3">
                {title}
            </h3>
            <div className="flex justify-center">
                <CardList
                    content={content}
                    isMovie={isMovie}
                    count={20}
                    loading={loading}
                />
            </div>
            <div className="mt-4 flex justify-center items-center">
                <PaginationComponent
                    page={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                />
            </div>
        </div>
    );
}
