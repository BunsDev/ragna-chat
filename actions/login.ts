"use server"
import * as z from "zod"
import { LoginSchema } from "@/schemas"
import { generateLoginCode } from "@/utils/generate-login-code"

export const login = async (values:z.infer<typeof LoginSchema>) =>{
    const validatedFields = LoginSchema.safeParse(values)
    if(!validatedFields.success){
        return {error:"Invalid fields!"}
    }

    if(!validatedFields.data.code){
        const code = generateLoginCode()
        return {success:"Code sent to your email!"}
    }
    if(validatedFields.data.code !== "123456"){
        return {error:"Invalid code!"}
    }
    return {success:"Logged in!"}
}