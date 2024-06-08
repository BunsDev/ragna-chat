import { Message } from "@/components/chat/chat-bot";
import { openRouter } from "@/lib/openrouter";

if (!process.env.OPENROUTER_API_KEY) throw new Error("Missing OPEN ROUTER API Key");

export const POST = async (req:Request) => {
  const {newMessages} = await req.json();
  console.log(newMessages)

  if (!newMessages) return new Response("Missing prompt", { status: 400 });
  // console.log(prompt)
  

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const stream = await openRouter.chat.completions.create({
    model: "google/gemma-7b-it:free",
    max_tokens:3000,
    stream: true,
    messages: newMessages
  });

  const readableStream = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || "";
        if (content) {
          controller.enqueue(encoder.encode(content));
        }
      }
      controller.close();
    },
  });

  return new Response(readableStream, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  });
};