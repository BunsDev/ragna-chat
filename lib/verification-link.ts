import { getVerificationTokenByEmail } from '@/data'
import { v4 as uuidv4 } from 'uuid'
import { db } from '@/lib/db'

export const generateVerificationToken = async (email: string) => {
    try {
        const existingToken = await getVerificationTokenByEmail(email)
        if (!existingToken || existingToken.expires < new Date()) {
            const token = uuidv4();
            const expires = new Date(new Date().getTime() + 3600 * 1000)


            if (existingToken) {
                await db.verificationToken.delete({ where: { id: existingToken.id } })
            }

            await db.verificationToken.create({
                data: {
                    email,
                    token,
                    expires,
                }
            })

            return token
        }
        return existingToken.token
    }
    catch (error) {
        console.error(error)
    }
}