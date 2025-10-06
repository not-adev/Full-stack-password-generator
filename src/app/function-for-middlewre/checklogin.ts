// lib/middleware/auth.ts
import { NextRequest, NextResponse } from 'next/server';

export function CheckLogin(request: NextRequest) {
        const token = request.cookies.get('token')?.value;
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
        return null;
    
}
