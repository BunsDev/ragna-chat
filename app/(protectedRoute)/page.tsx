import { HomeChatBotForm } from "@/components/chat/home-chat-form"
import HomeChatList from "@/components/chat/home-chat-list"
import { getAllChatsByUserId } from "@/data"
import { currentUser } from "@/lib/auth"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

const HomePage = async () => {
  const user = await currentUser()
  const chats = await getAllChatsByUserId(user?.id!)

  return (
    <section className="flex justify-center">
      <div className="md:w-[80%] h-full">
        <div className="flex flex-col gap-10 justify-center">
          <HomeChatBotForm userId={user?.id!} />
          <Card>
            <CardHeader><h3 className="text-muted-foreground text-sm font-semibold text-center">Previous chats</h3></CardHeader>
            <CardContent className="flex justify-center items-center">
              {chats.length > 0 ? (<ScrollArea className="h-auto max-h-[calc(80vh-10rem)] mx-auto my-5">
                <HomeChatList chats={chats} />
              </ScrollArea>) : (<><p>No chats found. Start a new chat!</p></>)}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
export default HomePage