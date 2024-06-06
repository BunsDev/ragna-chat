import { getDeleteCodeByEmail } from "@/data"
import crypto from "crypto"
import { db } from "./db"

export const generateDeleteCode = async (email: string) => {
    try {
        const oldDeleteCode = await getDeleteCodeByEmail(email)
        if (oldDeleteCode) {
            const isExpiried = (new Date(oldDeleteCode.expires) < new Date())
            if (!isExpiried) {
                return oldDeleteCode.token
            }
            await db.deleteCode.delete({ where: { token: oldDeleteCode.token } })
        }
        const deleteCode = crypto.randomInt(100_000, 1_000_000).toString()
        const expires = new Date(new Date().getTime() + 1 * 60 * 1000)
        const newdeleteCode = await db.deleteCode.create({ data: { email, token: deleteCode, expires } })
        return newdeleteCode.token
    }
    catch (error) {
        console.error(error)
    }
}