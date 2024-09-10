import Search from "@/components/Search";

export default function SearchPage({
    params,
}: {
    readonly params: { str: string };
}) {
    const searchQuery = decodeURIComponent(params.str);

    return (
        <div className="flex items-center flex-col max-w-screen-2xl mx-auto">
            <Search searchStr={searchQuery} />
        </div>
    );
}
