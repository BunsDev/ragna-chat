"use server"
import { db } from "@/lib/db"

export const newChat = async (userId: string) => {
    try {
        const chat = await db.chat.create({
            data: {
                userId
            }
        })
        return { success: "Chat successfully created", chat }
    } catch (e) {
        console.log(e)
        return { error: "Chat creation failed" }
    }
}