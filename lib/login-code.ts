import { getLoginCodeByEmail } from "@/data"
import crypto from "crypto"
import { db } from "./db"

export const generateLoginCode = async (email: string) => {
    try {
        const oldLoginCode = await getLoginCodeByEmail(email)
        if (oldLoginCode) {
            const isExpiried = (new Date(oldLoginCode.expires) < new Date())
            if (!isExpiried) {
                return oldLoginCode.token
            }
            await db.loginCode.delete({ where: { token: oldLoginCode.token } })
        }
        const loginCode = crypto.randomInt(100_000, 1_000_000).toString()
        const expires = new Date(new Date().getTime() + 5 * 60 * 1000)
        const newLoginCode = await db.loginCode.create({ data: { email, token: loginCode, expires } })
        return newLoginCode.token
    }
    catch (error) {
        console.error(error)
    }
}