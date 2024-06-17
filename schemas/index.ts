import * as z from "zod"

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }).transform((email) => email.toLowerCase()),
    code: z.optional(z.string())
})

export const SettingsNameSchema = z.object({
    name: z.string().min(2, { message: "Minimum 2 Characters" }).max(50, { message: "Maximum 50 Characters" })
})

export const SettingsEmailSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }).transform((email) => email.toLowerCase())
})

export const SettingsDeleteSchema = z.object({
    code: z.string({ message: "Code is required" })
})

const validateFileSize = (file: File) => {
    const maxSize = 5 * 1024 * 1024;// 5MB in bytes
    return file.size <= maxSize
}

export const ChatBotSchema = z.object({
    file: z.optional(z.array(z.instanceof(File).refine((file:File) => {
        return validateFileSize(file) && (file.type.startsWith("text/") || file.type === "application/pdf")
    }))),
    prompt: z.string()
        .min(1, { message: "Prompt must be at least 1 character long." })
        .max(3600, { message: "Prompt cannot exceed 3600 characters." })
        .refine(value => !/^\s*$/.test(value), {
            message: "Prompt must not be empty or consist only of whitespace characters."
        })
})

export const EditChatNameSchema = z.object({
    name: z.string().min(2, { message: "Minimum 2 Characters" }).max(20, { message: "Maximum 20 Characters" })
})