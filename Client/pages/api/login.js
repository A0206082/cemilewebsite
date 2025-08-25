// Client/pages/api/login.js
import { encrypt } from '../../lib/jwt'; // Import our new function
import { serialize } from 'cookie';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const { password } = req.body;

    if (password === process.env.ADMIN_PASSWORD) {
        // Create the session payload
        const session = { user: 'admin', expires: new Date(Date.now() + 8 * 60 * 60 * 1000) };

        // Encrypt the session to a token
        const token = await encrypt(session);

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