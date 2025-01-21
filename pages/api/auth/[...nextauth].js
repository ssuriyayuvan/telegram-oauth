// import { createUserOrUpdate } from "@/lib/prisma";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { objectToAuthDataMap, AuthDataValidator } from "@telegram-auth/server";


export const authOptions = {
	providers: [
		CredentialsProvider({
			id: "telegram-login",
			name: "Telegram Login",
			credentials: {},
			async authorize(credentials, req) {
				const validator = new AuthDataValidator({
					botToken: `${process.env.TELEGRAM_BOT_TOKEN}`,
				});

				const data = objectToAuthDataMap(req.query || {});
				const user = await validator.validate(data);

				if (user.id && user.first_name) {
					const returned = {
						id: user.id.toString(),
						email: user.id.toString(),
						name: [user.first_name, user.last_name || ""].join(" "),
						image: user.photo_url,
					};

					try {
                        console.log("user", user)
						// await createUserOrUpdate(user);
					} catch {
						console.log(
							"Something went wrong while creating the user."
						);
					}

					return returned;
				}
				return null;
			},
		}),
	],
	callbacks: {
		async session({ session, user, token }) {
			session.user.id = session.user.email;
			return session;
		},
	},
	pages: {
		signIn: "/auth/signin",
		error: "/auth/error",
	},
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };