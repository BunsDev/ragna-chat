"use server"
import { db } from "@/lib/db"

export const deleteLatestMessage = async (chatId: string) => {
    try{
    const latestMessage = await db.message.findFirst({where: {chatId:chatId}, orderBy: {createdAt: 'desc'}})
    await db.message.delete({where: {id: latestMessage?.id}})
    return
    }catch(e){
        console.log(e)
        return
    }
}