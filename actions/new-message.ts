"use server"
import { db } from "@/lib/db"

export const newMessage = async (chatId: string, role: string, content: string) => {
    try{
        await db.message.create({
            data: {
                chatId,
                role,
                content
            }
        })
        return {success: true}
    }
    catch(e){
        console.log(e)
        return {error:true}
    }
}