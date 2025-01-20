import { ChatBotComponent } from "@/components/chat/chat-bot";
import { siteConfig } from "@/config";
import { getChatById, getMessagesByChatId } from "@/data";
import { currentUser } from "@/lib/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const runtime = "edge";

export const metadata: Metadata = {
  title: `Chat | ${siteConfig.name}`,
  description: "Chat Page",
};

interface PageProps {
  params: { chatId: string };
  searchParams?: Record<string, string | string[] | undefined>;
}

const ChatPage = async ({ params }: PageProps) => {
  const user = await currentUser();
  const { chatId } = params;

  // Parallel data fetching
  const [chat, dbMessages] = await Promise.all([
    getChatById(chatId),
    getMessagesByChatId(chatId),
  ]);

  // Authorization check
  if (!chat || user?.id !== chat.userId) {
    redirect("/");
  }

  return (
    <div className="md:w-[80%] md:mx-auto">
      <ChatBotComponent
        chatId={chatId}
        isChatName={!!chat.name}
        dbMessages={dbMessages ?? []}
      />
    </div>
  );
};

export default ChatPage;
