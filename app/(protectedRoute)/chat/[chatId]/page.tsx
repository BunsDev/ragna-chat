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
  params: { chatId: string };
}

const ChatPage = async ({ params }: ChatPageProps) => {
  const user = await currentUser();
  const { chatId } = params;

  // Fetching chat details and messages
  const chat = await getChatById(chatId);
  const dbMessages = await getMessagesByChatId(chatId);

  // Redirect if chat not found or user doesn't own the chat
  if (!chat || user?.id !== chat.userId) return redirect("/");

  // Return the chat component
  return (
    <div className="md:w-[80%] md:mx-auto">
      <ChatBotComponent
        chatId={chatId}
        isChatName={!!chat?.name}
        dbMessages={dbMessages!}
      />
    </div>
  );
};

export default ChatPage;
