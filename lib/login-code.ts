import { getLoginCodeByEmail } from "@/data"
import { db } from "./db"

export const generateLoginCode = async (email: string) => {
    try {
        const oldLoginCode = await getLoginCodeByEmail(email)
        if (oldLoginCode) {
            const isExpired = (new Date(oldLoginCode.expires) < new Date())
            if (!isExpired) {
                return oldLoginCode.token
            }
            await db.loginCode.delete({ where: { token: oldLoginCode.token } })
        }
        
        // Edge-compatible crypto implementation
        const randomNumber = crypto.getRandomValues(new Uint32Array(1))[0];
        const loginCode = (100_000 + (randomNumber % 900_000)).toString().padStart(6, '0');
        
        const expires = new Date(Date.now() + 5 * 60 * 1000) // 5 minutes
        const newLoginCode = await db.loginCode.create({ 
            data: { 
                email, 
                token: loginCode, 
                expires 
            } 
        })
        
        return newLoginCode.token
    } catch (error) {
        console.error(error)
        throw error // Consider re-throwing for proper error handling
    }
}