"use server"
import { db } from "@/lib/db"

export const deleteLatestTrialMessage = async (chatId: string) => {
    try{
    const latestMessage = await db.message.findFirst({where: {chatId:chatId}, orderBy: {createdAt: 'desc'}})
    await db.trialMessage.delete({where: {id: latestMessage?.id}})
    return
    }catch(e){
        console.log(e)
        return
    }
}