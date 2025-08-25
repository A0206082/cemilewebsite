// pages/api/login.js
import { SignJWT } from 'jose';
import { serialize } from 'cookie';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end(); // Method Not Allowed
    }

    const { password } = req.body;

    // Compare the submitted password with the one in our environment variables
    if (password === process.env.ADMIN_PASSWORD) {
        // Create a secure token (JWT)
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const token = await new SignJWT({ user: 'admin' })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('8h') // Token expires in 8 hours
            .sign(secret);

        // Set the token in a secure, HTTP-only cookie
        const cookie = serialize('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
            sameSite: 'strict',
            maxAge: 60 * 60 * 8, // 8 hours
            path: '/',
        });

        res.setHeader('Set-Cookie', cookie);
        return res.status(200).json({ success: true });
    }

    // If password does not match
    return res.status(401).json({ error: 'Invalid password' });
}