/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		DATABASE_URL: "mongodb+srv://tranhuuvinh1109:vinh1109@cluster0.fg9i8xq.mongodb.net/test",
		NEXTAUTH_JWT_SECRET: "NEXT-JWT-SECRET",
		NEXTAUTH_SECRET: "NEXT-SECRET",
		GITHUB_ID: "d2ffa7b1f04eb2e4905c",
		GITHUB_SECRET: "361b534de912e60930f31cdebe333409cb7aa15b ",
		// GOOGLE_CLIENT_ID: "329648410405-5goedjjncmhbbc4fldvms6ustjlad99u.apps.googleusercontent.com",
		// GOOGLE_CLIENT_SECRET: "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",
		GOOGLE_CLIENT_ID: "329648410405-4r4oaq6f80ost7eghapuigdijstk8k8r.apps.googleusercontent.com",
		GOOGLE_CLIENT_SECRET: "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",
	},
	async headers () {
		return [
			{
				source: '/favicon.ico',
				headers: [
					{
						key: 'Link',
						value: '/images/netflix-icon.png',
					},
				],
			},
		];
	},
}

module.exports = nextConfig
