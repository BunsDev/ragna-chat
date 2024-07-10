import { HomeChatBotForm } from "@/components/chat/home-chat-form"
import HomeChatList from "@/components/chat/home-chat-list"
import { getAllChatsByUserId } from "@/data"
import { currentUser } from "@/lib/auth"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ModelDropdown } from "@/components/chat/model-dropdown"


export const runtime = 'edge'


const HomePage = async () => {
  const user = await currentUser()
  const chats = await getAllChatsByUserId(user?.id!)


  return (
    <section className="gridbg flex justify-center">
      <div className="md:w-[80%] h-full">
        <div className="flex flex-col gap-10 justify-center h-[calc(100vh-5rem)] items-center">
          <div className="flex flex-col justify-center text-center select-none">
            <h1 className="font-extrabold tracking-tighter text-3xl md:text-5xl">Universal Chat Assistant</h1>
            <h3 className="fond-bold text-lg text-muted-foreground">Your Ultimate Multimodal AI Conversationalist</h3>
          </div>
          <HomeChatBotForm userId={user?.id!} />
          <ModelDropdown className="max-w-[200px]"/>
          {chats.length > 0 && (
              <Card>
                <CardHeader><h3 className="text-muted-foreground text-sm font-semibold text-center">Previous chats</h3></CardHeader>
                <CardContent className="flex justify-center items-center">
                  <ScrollArea className="h-auto max-h-[calc(80vh-10rem)] mx-auto my-5">
                    <HomeChatList chats={chats} />
                  </ScrollArea>
                </CardContent>
              </Card>
          )}
        </div>
      </div>
    </section>
  )
}
export default HomePage