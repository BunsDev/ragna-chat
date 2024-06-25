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

export const getAllChatsByUserId = async (userId: string) => {
    return await db.chat.findMany({ where: { userId },
        orderBy: { updatedAt: 'desc' } })
}

export const getChatById = async (id: string) => {
    try {
        return await db.chat.findFirst({ where: { id } })
    } catch {
        return null
    }
}

export const getMessagesByChatId = async (chatId: string) => {
    try {
        return await db.message.findMany({
            where: { chatId },
            select: {
                role: true,
                content: true
            }
        })
    } catch {
        return null
    }
}

export const getTrialChatById = async (id: string) => {
    try {
        return await db.trialChat.findFirst({ where: { id } })
    } catch {
        return null
    }
}

export const getTrialMessagesByChatId = async (chatId: string) => {
    try {
        return await db.trialMessage.findMany({
            where: { chatId },
            select: {
                role: true,
                content: true
            }
        })
    } catch {
        return null
    }
}