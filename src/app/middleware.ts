import { NextRequest, NextResponse } from 'next/server';
import { CheckLogin } from './function-for-middlewre/checklogin';
import { loggerMiddleware } from './function-for-middlewre/Logger';
export function middleware(request: NextRequest) {
     const { pathname } = request.nextUrl;
    loggerMiddleware(request)
    if (pathname.startsWith('/signup')) {
        CheckLogin(request)
    }
    if (pathname === '/') {
    return NextResponse.redirect(new URL('/signup', request.url));
  }

    return NextResponse.next();
}
export const config = {
    matcher: ['/sing'],
};