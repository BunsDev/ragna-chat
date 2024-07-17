import type { Metadata } from "next"
import { Inter as FontSans } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/config"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { auth } from "@/auth"
import { SessionProvider } from "next-auth/react"
import { Provider as JotaiProvider } from "jotai"
import { GoogleAnalytics } from '@next/third-parties/google'
import { redirect } from "next/navigation"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})


export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords:[
    "Chatbot",
    "AI Chatbot",
    "Chatbot Development",
    "Chatbot Integration",
    "Chatbot Services",
    "Chatbot Solutions",
    "Chatbot Development Company",
    "Chatbot Development Services",
    "Chatbot Development Agency",
    "Chatbot Development Solutions",
  ],
  authors: [
    {
      name: "Mihir Gala",
      url: "https://mihircodes.me",
    },
  ],
  creator: "Mihir Gala",
  metadataBase: new URL(siteConfig.url!),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: "@mihiirgala",
  },
  icons: {
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
    icon:"/favicon.ico",
  },
  manifest:`/manifest.json`,
}

interface RootLayoutProps {
  children: React.ReactNode
}

const RootLayout = async ({ children }: RootLayoutProps) => {
  const user = await auth()
  return (
    <JotaiProvider>
      <SessionProvider session={user}>
        <html lang="en">
          <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </body>
          <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID!}/>
        </html>
      </SessionProvider>
    </JotaiProvider>
  )
}

export default RootLayout