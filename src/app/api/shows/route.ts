import axios from "axios";
import { NextRequest } from "next/server";
import { URL, API_KEY } from "@/lib/url";

export async function GET(request: NextRequest) {
    const pageParams = request.nextUrl.searchParams;
    const query = pageParams.get("page");

    const res = await axios.get(
        `${URL}/tv/top_rated?api_key=${API_KEY}&region=US&page=${query}`
    );
    return Response.json(res.data);
}
