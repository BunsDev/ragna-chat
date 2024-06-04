import { SiteConfig } from "@/types"

export const siteConfig: SiteConfig = {
  name: "Ragna.day",
  description: "",
  url: process.env.BASE_URL,
  ogImage: process.env.BASE_URL+"/og.jpg",
}