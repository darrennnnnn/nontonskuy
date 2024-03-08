export default function MovieInfo({
    params,
}: {
    readonly params: { moviesId: string };
}) {
    return (
        <div>
            pager {params.moviesId} <h2>HI</h2>
        </div>
    );
}
