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

interface ChatPageProps {
  params: Promise<{ chatId: string }>;
}

const ChatPage = async ({ params }: ChatPageProps) => {
  const { chatId } = await params;
  const user = await currentUser();

  // Parallel data fetching like trial version
  const [chat, messages] = await Promise.all([
    getChatById(chatId),
    getMessagesByChatId(chatId),
  ]);

  if (!chat || user?.id !== chat.userId) {
    redirect("/");
  }

  return (
    <div className="md:w-[80%] md:mx-auto">
      <ChatBotComponent
        chatId={chatId}
        isChatName={!!chat.name}
        dbMessages={messages ?? []}
      />
    </div>
  );
};

export default ChatPage;
