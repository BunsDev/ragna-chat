import pdfParse from 'pdf-parse'
import { ChatBotSchema } from "@/schemas"
import * as z from "zod"

export const customReadFile = async (values: z.infer<typeof ChatBotSchema>) => {
    const { file } = values
    if (file) {
        try {
            if (file[0].type.startsWith("text/")) {
                const content = await file[0].text()
                return { success: true, content, name: file[0].name }
            }
            if (file[0].type === "application/pdf") {
                const buffer = Buffer.from(await file[0].arrayBuffer())
                const pdf = await pdfParse(buffer)
                return { success: true, contnent: pdf.text, name: file[0].name }
            }
        } catch (error) {
            console.error("Error reading file:", error)
            return { error: true }
        }
    }
}
