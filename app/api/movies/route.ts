import { NextApiResponse } from "next";
import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";
import { NextResponse } from "next/server";

export async function GET (req: Request, res: NextApiResponse) {
	try {
		if (req.method !== 'GET') {
			return NextResponse.json({ error: 'GET' }, {
				status: 405,
			})
		}

		await serverAuth();

		const movies = await prismadb.movie.findMany();

		return NextResponse.json(movies, {
			status: 200,
		})
	} catch (err) {
		return NextResponse.json({ error: err }, {
			status: 500,
		})
	}
}
