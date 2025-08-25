// middleware.js (in the root folder)
import { NextResponse } from 'next/server';
import { decrypt } from './Client/lib/jwt'; // Note the path to our helper

export async function middleware(req) {
    const token = req.cookies.get('auth_token')?.value;

    // If no token, redirect to login
    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    // Decrypt the token
    const decryptedSession = await decrypt(token);

    // If the token is invalid or expired, redirect to login
    if (!decryptedSession) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    // If the token is valid, allow the request to proceed
    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*',
};