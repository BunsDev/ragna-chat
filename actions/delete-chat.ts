"use server"
import { db } from "@/lib/db"

export const deleteChat = async (id:string)=>{
    try{
        await db.chat.delete({where:{id}})
        return {success:"Chat deleted successfully"}
    }
    catch(e){
        return {error:"Something went wrong"}
    }
}