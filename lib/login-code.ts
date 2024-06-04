import { getLoginCodeByEmail } from "@/data"
import crypto from "crypto"
import { db } from "./db"

export const generateLoginCode = async (email: string) => {
    try {
        const oldLoginCode = await getLoginCodeByEmail(email)
        if (!oldLoginCode || oldLoginCode.expires < new Date()) {
            const loginCode = crypto.randomInt(100_000, 1_000_000).toString()
            const expires = new Date(new Date().getTime() + 5 * 60 * 1000)
            await db.loginCode.create({ data: { email, token:loginCode, expires } })
            return loginCode
        }
        return oldLoginCode.token
    }
    catch (error) {
        console.error(error)
    }
}