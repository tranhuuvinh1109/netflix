import bcrypt from 'bcrypt'
import prismadb from '../../../lib/prismadb'
import { NextResponse } from 'next/server'

export async function POST (req: Request, res: Response) {
	if (req.method !== 'POST') {
		return NextResponse.json({ error: 'Method Pots' }, {
			status: 400,
		})
	}
	try {
		const reqq = await req.json()

		const existingUser = await prismadb.user.findUnique({
			where: {
				email: reqq.email
			}
		})

		if (existingUser) {
			return NextResponse.json({ error: 'Email taken' }, {
				status: 422,
			})
		}

		const hashedPassword = await bcrypt.hash(reqq.password, 12)

		const user = await prismadb.user.create({
			data: {
				email: reqq.email,
				name: reqq.name,
				hashedPassword,
				image: '',
				emailVerified: new Date()

			}
		})

		return NextResponse.json({
			data: user
		}, {
			status: 200,
		})
	} catch (err) {
		console.log(err)
		return NextResponse.json({ error: err })
	}
}
export async function GET () {
	return NextResponse.json({ name: 'vinh' })
}