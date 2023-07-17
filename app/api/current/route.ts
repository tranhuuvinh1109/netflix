import { NextApiResponse } from 'next';
import serverAuth from '@/lib/serverAuth';
import { NextResponse } from 'next/server'

export async function GET (req: Request, res: NextApiResponse) {
	if (req.method !== 'GET') {
		return NextResponse.json({ error: 'Method GET' }, {
			status: 405,
		})
	}

	try {
		const { currentUser } = await serverAuth();
		return NextResponse.json(currentUser, {
			status: 200,
		})
	} catch (err) {
		return NextResponse.json({ error: err }, {
			status: 400,
		})
	}
}