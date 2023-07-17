import { NextApiResponse } from "next";
import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";
import { NextResponse } from 'next/server'

export async function GET (req: Request, res: NextApiResponse) {
	try {
		if (req.method !== 'GET') {
			return NextResponse.json({ error: 'Method Pots' }, {
				status: 405,
			})
		}

		await serverAuth();

		const moviesCount = await prismadb.movie.count();
		console.log('movies count -->', moviesCount)
		const randomIndex = Math.floor(Math.random() * moviesCount);

		const randomMovies = await prismadb.movie.findMany({
			take: 1,
			skip: randomIndex
		});
		return NextResponse.json(randomMovies[0], {
			status: 200,
		})
	} catch (err) {
		return NextResponse.json({ error: err }, {
			status: 500,
		})
	}
}
