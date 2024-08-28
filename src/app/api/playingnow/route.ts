import axios from "axios";
import { URL, API_KEY } from "@/lib/url";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const res = await axios.get(
        `${URL}/movie/now_playing?api_key=${API_KEY}`
    );

    return Response.json(res.data.results);
}
