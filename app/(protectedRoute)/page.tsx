// import { openRouter } from "@/actions/openrouter"
import { Testing }  from "@/components/text"
// import { currentUser } from "@/lib/auth"

const HomePage = async () => {
  // const user = await currentUser()
  // const responce= await openRouter()
  // console.log(responce)
  return (
    <main className="min-h-screen flex justify-center items-center">
      <section>
        {/* {`${responce.role}: ${responce.content}`} */}
        <Testing/>
      </section>
    </main>
  )
}
export default HomePage