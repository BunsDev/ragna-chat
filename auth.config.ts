import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "@/schemas"
import { findUserByEmail, getLoginCodeByEmail } from "@/data"
import { db } from "@/lib/db"

export default {
    providers: [
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