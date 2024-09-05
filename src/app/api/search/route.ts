import axios from "axios";
import { NextRequest } from "next/server";
import { URL, API_KEY } from "@/lib/url";

export async function GET(request: NextRequest) {
    const params = request.nextUrl.searchParams;
    const strQuery = params.get("str");
    const moviePageQuery = params.get("moviePage");
    const tvPageQuery = params.get("tvPage");

    const movieSearchURL = `${URL}/search/movie?query=${strQuery}&page=${moviePageQuery}&api_key=${API_KEY}&region=US`;
    const tvSearchURL = `${URL}/search/tv?query=${strQuery}&page=${tvPageQuery}&api_key=${API_KEY}&region=US`;

    const [movieResponse, tvResponse] = await Promise.all([
        axios.get(movieSearchURL),
        axios.get(tvSearchURL),
    ]);

    const res = {
        movies: movieResponse.data,
        tv: tvResponse.data,
    };

    return Response.json(res);
}
