import { NextApiResponse } from "next";
import { NextResponse } from 'next/server'

import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export async function GET (req: Request, res: NextApiResponse) {
	try {
		if (req.method !== 'GET') {
			return NextResponse.json({ error: 'Method GET' }, {
				status: 405,
			})
		}

		const { currentUser } = await serverAuth();
		const favoritedMovies = await prismadb.movie.findMany({
			where: {
				id: {
					in: currentUser?.favoriteIds,
				}
			}
		});

		return NextResponse.json(favoritedMovies, {
			status: 200,
		})
	} catch (err) {
		return NextResponse.json({ error: err }, {
			status: 500,
		})
	}
}
