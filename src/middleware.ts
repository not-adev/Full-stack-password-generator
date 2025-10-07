import { NextRequest, NextResponse } from 'next/server';
import { CheckLogin } from './app/function-for-middlewre/checklogin';
import { loggerMiddleware } from './app/function-for-middlewre/Logger';
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    loggerMiddleware(request)
     if (pathname.startsWith('/signup') || pathname === '/'  ) {
        CheckLogin(request)
    }

    return NextResponse.next();
}
export const config = {
   matcher: [
    '/api/:path*',     // ✅ Match all API routes
    '/signup',         // ✅ Match signup page
    '/',               // ✅ Match root
  ],

};  