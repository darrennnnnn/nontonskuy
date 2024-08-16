import axios from "axios";
import { NextRequest } from "next/server";
import { URL, API_KEY } from "@/lib/url";

export async function GET(request: NextRequest) {
    const strParams = request.nextUrl.searchParams;
    const query = strParams.get("str");

    const res = await axios.get(
        `${URL}/search/movie?query=${query}&api_key=${API_KEY}&region=US`
    );

    return Response.json(res.data.results);
}
