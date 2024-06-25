import NextAuth from "next-auth"
import authConfig from "@/auth.config"

import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    publicRoutes,
    publicPubicPrefix,
    trialModePrefix
} from "@/routes"

const { auth } = NextAuth(authConfig)

export default auth ((req) => {

    const { nextUrl } = req
    const isLoggedIn = !!req.auth

    const isApiRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    // const isBlogRoute = nextUrl.pathname.startsWith(blogPrefix)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)
    const isTrialRoute = nextUrl.pathname.startsWith(trialModePrefix)
    
    if (isApiRoute) return
    // if (isBlogRoute) return null
    if(isTrialRoute){
        if(isLoggedIn){
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT))
        }
        return
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return
    }

    if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL("/auth/login", nextUrl))
    }
    return
})


export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}