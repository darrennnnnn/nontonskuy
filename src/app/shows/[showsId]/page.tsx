export default function ShowsInfo({
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
