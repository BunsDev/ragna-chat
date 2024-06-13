"use server"
import { db } from "@/lib/db";
import { openRouter } from "@/lib/openrouter";

export const generateTitle = async (chatId: string, _messages: any) => {
  try {
    const promptMessages = [..._messages,{ role: "system", content: "Generate a name for this chat context (20 character limit)" }]
    const completion = await openRouter.chat.completions.create({
      model: "mistralai/mixtral-8x22b-instruct",
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