import { db } from "@/lib/db"

export const findUserByEmail = async (email: string) => {
    return await db.user.findFirst({ where: { email } })
}

export const findUserById = async (id: string) => {
    return await db.user.findFirst({ where: { id } })
}

export const getLoginCodeByEmail = async (email: string) => {
    return await db.loginCode.findFirst({ where: { email } })
}

export const getVerificationTokenByEmail = async (email: string) => {
    return await db.verificationToken.findFirst({ where: { email } })
}

export const getVerificationTokenByToken = async (token: string) => {
    return await db.verificationToken.findFirst({ where: { token } })
}