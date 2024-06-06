"use server"

import { findUserByEmail, getVerificationTokenByToken } from "@/data"
import { db } from "@/lib/db"
import { sendVerificationSuccessEmail } from "@/lib/mail"

export const newVerification = async (token: string) => {
    try {
        const existingToken = await getVerificationTokenByToken(token)

        if (!existingToken) {
            return { error: "Token does not exist!" }
        }

        const hasExpired = new Date(existingToken.expires) < new Date()
        if (hasExpired) {
            return { error: "Token has expired!" }
        }

        const existingUser = await findUserByEmail(existingToken.email)
        if (!existingUser) {
            return { error: "Email does not exist!" }
        }

        await db.user.update({
            where: { id: existingUser.id },
            data: {
                emailVerified: new Date(),
                email: existingToken.email
            }
        })

        await db.verificationToken.delete({ where: { id: existingToken.id } })
        await sendVerificationSuccessEmail(existingToken.email)
        return { success: "Email verified!" }
    }
    catch (error) {
        console.error(error)
        return { error: "Something went wrong!" }
    }
}