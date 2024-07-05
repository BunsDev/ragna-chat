"use server"
import { db } from "@/lib/db"

export const newLatestFeedback = async (feedback: "GOOD" | "BAD") => {
    try {
        const latestMessage = await db.message.findFirst({
            orderBy: { createdAt: "desc" }
        })
        await db.message.update({
            where: { id: latestMessage?.id },
            data: { feedback }
        })
        return { success: true }
    } catch (e) {
        console.log(e)
        return { error: "Something went wrong!" }
    }
}