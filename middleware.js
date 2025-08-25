// middleware.js
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export const runtime = 'nodejs';

export async function middleware(req) {
    const token = req.cookies.get('auth_token')?.value;
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { pathname } = req.nextUrl;

    // If there's no token or the token is invalid, redirect to login
    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
        // Verify the token is valid
        await jwtVerify(token, secret);
        // If token is valid, allow the request to continue
        return NextResponse.next();
    } catch (err) {
        // If verification fails, redirect to login
        console.error('JWT Verification failed:', err.message);
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

// This specifies which paths the middleware should run on
export const config = {
    matcher: '/admin/:path*',
};