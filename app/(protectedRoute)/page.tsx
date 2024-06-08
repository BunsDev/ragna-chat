import { ChatBotComponent } from "@/components/chat/chat-bot"
import { currentUser } from "@/lib/auth"

const HomePage = async () => {
  const user = await currentUser()

  return (
      <section className="flex justify-center">
        {/* <div className="hidden md:block md:w-[20%] h-full">abc</div> */}
        <div className="w-full h-full">
          <ChatBotComponent user={user} />
          </div>
      </section>
  )
}
export default HomePage