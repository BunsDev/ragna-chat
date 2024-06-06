import { db } from "@/lib/db"

export const findUserByEmail = async (email: string) => {
    return await db.user.findFirst({ where: { email } })
}

export const findUserById = async (id: string) => {
    return await db.user.findFirst({ where: { id } })
}

export const findAccountByUserId = async (userId: string) => {
    return await db.account.findFirst({ where: { userId } })
}

export const getLoginCodeByEmail = async (email: string) => {
    return await db.loginCode.findFirst({ where: { email } })
}
export const getDeleteCodeByEmail = async (email: string) => {
    return await db.deleteCode.findFirst({ where: { email } })
}
export const getDeleteCodeById = async (id: string) => {
    return await db.deleteCode.findFirst({ where: { id } })
}

export const getVerificationTokenByEmail = async (email: string) => {
    return await db.verificationToken.findFirst({ where: { email } })
}

export const getVerificationTokenByToken = async (token: string) => {
    return await db.verificationToken.findFirst({ where: { token } })
}