import axios from "axios";
import { URL, API_KEY } from "@/lib/url";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const params = request.nextUrl.searchParams;
    const idQuery = params.get("id");
    const typeQuery = params.get("type");

    const res = await axios.get(
        `${URL}/${typeQuery}/${idQuery}/videos?api_key=${API_KEY}&language=en-US`
    );

    return Response.json(res.data);
}
