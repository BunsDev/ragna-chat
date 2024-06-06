import { currentUser } from "@/lib/auth"

const HomePage = async () => {
  const user = await currentUser()
  return (
    <main className="min-h-screen flex justify-center items-center">
      <section>
        <h1>Home Page</h1>
        {!!user && (
          <>
            <p>{user.name || "no name"}</p>
            <p>{user.email}</p>
          </>
        )}
      </section>
    </main>
  )
}
export default HomePage