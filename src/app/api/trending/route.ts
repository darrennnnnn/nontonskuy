import axios from "axios";
import { NextRequest } from "next/server";
import { URL, API_KEY } from "@/lib/url";

export async function GET(request: NextRequest) {
    const typeParams = request.nextUrl.searchParams;
    const query = typeParams.get("type");

    const res = await axios.get(
        `${URL}/trending/${query}/week?api_key=${API_KEY}&region=US`
    );

    return Response.json(res.data.results);
}
