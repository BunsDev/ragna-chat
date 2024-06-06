import * as z from "zod"

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    code: z.optional(z.string())
})

export const SettingsNameSchema = z.object({
    name: z.string().min(2, {message:"Minimum 2 Characters"}).max(50, {message:"Maximum 50 Characters"})
})

export const SettingsEmailSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    })
})

export const SettingsDeleteSchema = z.object({
    code: z.string({message:"Code is required"})
})