// middleware.js
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jsonwebtoken';

export const runtime = 'nodejs';

async function verify(token, secret) {
    try {
        await jwt.verify(token, secret);
        return true;
    } catch (error) {
        return false;
    }
}
export async function middleware(req) {
    const token = req.cookies.get('auth_token')?.value;
    const secret = process.env.JWT_SECRET;
    const { pathname } = req.nextUrl;

    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
        // Use the new library to verify the token
        jwt.verify(token, secret);
        return NextResponse.next();
    } catch (err) {
        console.error('JWT Verification failed:', err.message);
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

export const config = {
    matcher: '/admin/:path*',
};