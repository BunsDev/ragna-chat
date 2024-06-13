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

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

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
        </html>
      </SessionProvider>
    </JotaiProvider>
  )
}

export default RootLayout