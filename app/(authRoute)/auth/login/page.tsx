import { LoginForm } from "@/components/auth/login-form"
import { siteConfig } from "@/config"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: `Login | ${siteConfig.name}`,
  description: "Login Page",
}

export const runtime = 'edge'

const LoginPage = () => {
  return (
    <section>
    <div
     className="min-h-screen flex justify-center items-center">
        <LoginForm/>
    </div>
    </section>
  )
}
export default LoginPage