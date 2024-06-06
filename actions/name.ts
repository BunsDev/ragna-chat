"use server"

import * as z from "zod"
import { SettingsNameSchema } from "@/schemas"
import { db } from "@/lib/db"

export const updateName = async (values: z.infer<typeof SettingsNameSchema>, userId:string) => {
    try {
        const validatedFields = SettingsNameSchema.safeParse(values)
        if (!validatedFields.success) {
            return { error: "Invalid fields!" }
        }
        await db.user.update({ where: { id: userId }, data: { name: values.name } })
        return { success: "Name updated!" }
    }
    catch (error) {
        console.log(error)
        return { error: "Something went wrong!" }
    }
}