"use server"
import { db } from "@/lib/db";
import { openRouter } from "@/lib/openrouter";

export const generateTitle = async (chatId: string, _messages: any) => {
  try {
    const promptMessages = [..._messages,{ role: "system", content: "Generate a concise and catchy title for this chat (20 characters max)." }]
    const completion = await openRouter.chat.completions.create({
      model: "openai/gpt-3.5-turbo",
      messages: promptMessages,
    })

    await db.chat.update({
      where: { id: chatId },
      data: {
        name: completion.choices[0].message.content
      }
    })
    return { name: completion.choices[0].message.content }
  } catch (e) {
    console.error(e)
    return false
  }
}