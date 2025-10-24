import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { COOKIE_NAME } from "./lib/constants"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const sessionToken = request.cookies.get(COOKIE_NAME)?.value

  // console.log(sessionToken)

  // Define protected routes
  const isAdminDashboard = pathname.startsWith("/admin/dashboard")
  const isAuthPage = pathname.startsWith("/admin/login") || pathname.startsWith("/admin/verify-otp")

  // If user is authenticated and trying to access auth pages, redirect to dashboard
  if (sessionToken && isAuthPage) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url))
  }

  // If user is not authenticated and trying to access dashboard, redirect to login
  if (!sessionToken && isAdminDashboard) {
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
