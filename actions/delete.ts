"use server"
import * as z from "zod"
import { SettingsDeleteSchema } from "@/schemas"
import { db } from "@/lib/db"
import { sendDeleteCodeEmail } from "@/lib/mail"
import { generateDeleteCode } from "@/lib/delete-code"
import { signOut } from "@/auth"
import { getDeleteCodeByEmail } from "@/data"

export const deleteCodeAction = async (email:string) =>{
    try{
        const code = await generateDeleteCode(email)
        await sendDeleteCodeEmail(email, code!)
        return {success: "Code sent!"}
    }
    catch(error){
        console.error(error)
        return {error: "Something went wrong!"}
    }
}

export const deleteAccount = async (values: z.infer<typeof SettingsDeleteSchema>,email:string) =>{
    try{
        const validatedFields = SettingsDeleteSchema.safeParse(values)
        if(!validatedFields.success){
            return {error: "Invalid fields!"}
        }
        const code = await getDeleteCodeByEmail(email!)

        const isExpired = new Date() > new Date(code?.expires!)
        if(isExpired){
            return {error: "Code expired!"}
        }

        if(code?.token !== validatedFields.data.code){
            return {error: "Invalid code!"}
        }

        await db.user.delete({where:{email:email}})
        await db.deleteCode.deleteMany({where:{email:email}})
        return {success: "Account deleted!"}
    }
    catch(error){
        console.error(error)
        return {error: "Something went wrong!"}
    }
}