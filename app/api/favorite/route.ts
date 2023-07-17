import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";

import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";
import { NextResponse } from "next/server";

export async function POST (req: Request, res: NextApiResponse) {
	try {
		const { currentUser } = await serverAuth()
		const { movieId } = await req.json()
		const existingMovie = await prismadb.movie.findUnique({
			where: {
				id: movieId,
			}
		});

		if (!existingMovie) {
			throw new Error('Invalid ID');
		}

		const user = await prismadb.user.update({
			where: {
				email: currentUser.email || '',
			},
			data: {
				favoriteIds: {
					push: movieId
				}
			}
		});
		if (user) {
			return NextResponse.json(user, {
				status: 200,
			})
		}
		return NextResponse.json({ error: 'eroor' }, {
			status: 405,
		})

	} catch (err) {
		return NextResponse.json({ error: err }, {
			status: 500,
		})
	}
}

export async function DELETE (req: NextApiRequest, res: Response) {
	if (req.method === 'DELETE') {
		try {
			const { currentUser } = await serverAuth();

			const { movieId } = req.body;

			const existingMovie = await prismadb.movie.findUnique({
				where: {
					id: movieId,
				}
			});

			if (!existingMovie) {
				throw new Error('Invalid ID');
			}

			const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

			const updatedUser = await prismadb.user.update({
				where: {
					email: currentUser.email || '',
				},
				data: {
					favoriteIds: updatedFavoriteIds,
				}
			});
			return NextResponse.json(updatedUser, {
				status: 200,
			})

		} catch (err) {
			return NextResponse.json({ error: err }, {
				status: 500,
			})
		}
	}
}
