/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		DATABASE_URL: "mongodb+srv://tranhuuvinh1109:vinh1109@cluster0.fg9i8xq.mongodb.net/test",
		NEXTAUTH_JWT_SECRET: "NEXT-JWT-SECRET",
		NEXTAUTH_SECRET: "NEXT-SECRET"
	},
}

module.exports = nextConfig
