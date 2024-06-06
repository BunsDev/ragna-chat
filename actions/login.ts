"use server"
import * as z from "zod"
import { LoginSchema } from "@/schemas"
import { generateLoginCode } from "@/lib/login-code"
import { db } from "@/lib/db"
import { sendLoginCodeEmail, sendVerificationEmail } from "@/lib/mail"
import { generateVerificationToken } from "@/lib/verification-link"
import { getLoginCodeByEmail } from "@/data"
import { signIn } from "@/auth"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { AuthError } from "next-auth"

export const login = async (values: z.infer<typeof LoginSchema>) => {
    try {
        const validatedFields = LoginSchema.safeParse(values)
        if (!validatedFields.success) {
            return { error: "Invalid fields!" }
        }
        const user = await db.user.findFirst({ where: { email: validatedFields.data.email } })
        if (!user) {
            await db.user.create({ data: { email: validatedFields.data.email } })
            const token = await generateVerificationToken(validatedFields.data.email)
            sendVerificationEmail(validatedFields.data.email, token!)
            return { success: "Verification link sent to your email!" }
        }
        if (!user.emailVerified) {
            const token = await generateVerificationToken(validatedFields.data.email)
            sendVerificationEmail(validatedFields.data.email, token!)
            return { error: "Verification link sent to your email!" }
        }

        if (!validatedFields.data.code) {
            const loginCode = await generateLoginCode(validatedFields.data.email)
            await sendLoginCodeEmail(validatedFields.data.email, loginCode!)
            return { success: "Code sent to your email!", code: true }
        }
        const loginCode = await getLoginCodeByEmail(validatedFields.data.email)
        if (validatedFields.data.code !== loginCode?.token) {
            return { error: "Invalid code!" }
        }
        await signIn("credentials", {
            email: validatedFields.data.email,
            code: loginCode.token,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
    }
    catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!" }
                default:
                    return { error: "Something went wrong!" }
            }
        }
        throw error
    }
    return { error: "Something went wrong!" }
}