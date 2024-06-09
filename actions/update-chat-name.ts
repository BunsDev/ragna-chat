"use server"
import { db } from "@/lib/db"

export const updateChatName = async (id: string, name: string) => {
    try {
        await db.chat.update({ where: { id }, data: { name } })
        return { success: "Chat name updated!" }
    } catch (error) {
        return { error: "Something went wrong!" }
    }
}