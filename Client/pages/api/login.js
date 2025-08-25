// pages/api/login.js
import jwt from 'jsonwebtoken'; // Import the new library
import { serialize } from 'cookie';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const { password } = req.body;

    if (password === process.env.ADMIN_PASSWORD) {
        // Create a token using the new library
        const token = jwt.sign(
            { user: 'admin' },    // The data payload
            process.env.JWT_SECRET, // The secret key
            { expiresIn: '8h' }    // The expiration time
        );

        const cookie = serialize('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 60 * 60 * 8, // 8 hours
            path: '/',
        });

        res.setHeader('Set-Cookie', cookie);
        return res.status(200).json({ success: true });
    }

    return res.status(401).json({ error: 'Invalid password' });
}