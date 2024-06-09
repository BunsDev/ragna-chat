import { HomeChatBotForm } from "@/components/chat/home-chat-form"
import { getAllChatsByUserId } from "@/data"
import { currentUser } from "@/lib/auth"

const HomePage = async () => {
  const user = await currentUser()
  const Chats = await getAllChatsByUserId(user?.id!)

  return (
      <section className="flex justify-center">
        <div className="w-[80%] h-full">
          <div className="flex justify-center">
          <HomeChatBotForm userId={user?.id!}/>
          </div>
          </div>
      </section>
  )
}
export default HomePage