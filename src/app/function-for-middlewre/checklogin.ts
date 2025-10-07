// lib/middleware/auth.ts
import { NextRequest, NextResponse } from 'next/server';

export function CheckLogin(request: NextRequest) {
        const token = request.cookies.get('token')?.value;
        console.log("chek logn" , token)
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
        return NextResponse.redirect(new URL('/dashboard', request.url));
        
        
    
}
