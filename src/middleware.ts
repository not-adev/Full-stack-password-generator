import { NextRequest, NextResponse } from 'next/server'
import { loggerMiddleware } from './app/function-for-middlewre/Logger'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  loggerMiddleware(request)

  const token = request.cookies.get('token')?.value

  // ✅ Redirect logged-in users from / or /signup to /dashboard
  if ((pathname === '/' || pathname === '/signup') && token) {
    console.log('User already logged in, redirecting to /dashboard')
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // ✅ Redirect unauthenticated users from /dashboard to /login
  if (pathname === '/dashboard' && !token) {
    console.log('User not logged in, redirecting to /login')
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
  
}
export const config = {
  matcher: ['/', '/signup', '/dashboard'],
}