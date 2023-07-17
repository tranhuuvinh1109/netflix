import { NextApiResponse } from "next";
import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";
import { NextResponse } from "next/server";

export async function GET (req: Request, res: NextApiResponse) {
	try {
		const id = req.url.slice(req.url.lastIndexOf('/') + 1);
		if (req.method !== 'GET') {
			return NextResponse.json({ error: 'GET' }, {
				status: 405,
			})
		}
		await serverAuth();


		if (typeof id !== 'string') {
			throw new Error('Invalid Id');
		}

		if (!id) {
			throw new Error('Missing Id');
		}

		const movies = await prismadb.movie.findUnique({
			where: {
				id: id
			}
		});
		return NextResponse.json(movies, {
			status: 200,
		})
	} catch (err) {
		return NextResponse.json({ error: err }, {
			status: 500,
		})
	}
}
