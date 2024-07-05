import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import Apple from "next-auth/providers/apple"
import { LoginSchema } from "@/schemas"
import { findUserByEmail, getLoginCodeByEmail } from "@/data"
import { db } from "@/lib/db"

export default {
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
            allowDangerousEmailAccountLinking: true
        }),
        Apple({
            clientId: process.env.AUTH_APPLE_ID,
            clientSecret: process.env.AUTH_APPLE_SECRET as string,
            allowDangerousEmailAccountLinking: true
        }),
        Credentials({
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials)
                if (validatedFields.success) {
                    const { email, code } = validatedFields.data
                    const user = await findUserByEmail(email)
                    if (!user) return null
                    const loginCode = await getLoginCodeByEmail(email)
                    const codeMatch = (loginCode?.token === code)
                    if (codeMatch) {
                        await db.loginCode.deleteMany({ where: { email: email } })
                        return user
                    }
                }
                return null
            }

        })]
} satisfies NextAuthConfig