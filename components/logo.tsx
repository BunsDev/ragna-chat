import { siteConfig } from "@/config"
import { FcSms } from "react-icons/fc"

export const Logo = () => {
  return (
    <div className="flex items-center">
    <span className="md:hidden"><FcSms size={30} /></span>
    <span className="hidden md:block"><FcSms size={38} /></span>
    <h1 className="font-extrabold text-2xl md:text-3xl drop-shadow-lg">{siteConfig.name}</h1>
</div>
  )
}