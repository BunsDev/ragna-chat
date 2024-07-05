"use server"
import { db } from "@/lib/db"

export const newLatestTrialFeedback = async (feedback: "GOOD" | "BAD") => {
    try {
        const latestMessage = await db.trialMessage.findFirst({
            orderBy: { createdAt: "desc" }
        })
        await db.trialMessage.update({
            where: { id: latestMessage?.id },
            data: { feedback }
        })
        return { success: true }
    } catch (e) {
        console.log(e)
        return { error: "Something went wrong!" }
    }
}