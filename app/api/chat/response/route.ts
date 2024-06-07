import { openRouter } from "@/lib/openrouter";

if (!process.env.OPENROUTER_API_KEY) throw new Error("Missing OPEN ROUTER API Key");

export const POST = async (req:Request) => {
  const { prompt } = await req.json();

  if (!prompt) return new Response("Missing prompt", { status: 400 });

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const stream = await openRouter.chat.completions.create({
    model: "meta-llama/llama-3-8b-instruct:free",
    max_tokens:180,
    stream: true,
    messages: [{ role: "user", content: prompt }],
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