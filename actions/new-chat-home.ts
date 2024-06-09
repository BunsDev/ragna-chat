"use server"
import { db } from "@/lib/db"

export const makeNewChatwithValue = async (prompt:string,userId:string) => {
    try{
    const chat = await db.chat.create({
        data: {
            userId: userId
        }
    })
    await db.message.create({
        data: {
            chatId: chat.id,
            role: "user",
            content: prompt
        }
    })
    return {success:true,chat}
}catch(e){
    console.log(e)
    return {error:"Something went wrong!"}
}
}