import axios from "axios";
import { NextRequest } from "next/server";
import { URL, API_KEY } from "@/lib/url";

export async function GET(request: NextRequest) {
    const idParams = request.nextUrl.searchParams
    const query = idParams.get('id');

    const res = await axios.get(
        `${URL}/tv/${query}?api_key=${API_KEY}&language=en-US`
    );

    return Response.json(res.data);
}
