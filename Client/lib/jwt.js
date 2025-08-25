// Client/lib/jwt.js
import { SignJWT, jwtVerify } from 'jose';

// We must re-install 'jose' as it's the Vercel-recommended library for this pattern
// and is compatible with the Edge runtime when used correctly.

const secretKey = process.env.JWT_SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('8h')
        .sign(key);
}

export async function decrypt(input) {
    try {
        const { payload } = await jwtVerify(input, key, {
            algorithms: ['HS256'],
        });
        return payload;
    } catch (error) {
        // Return null or throw an error if the token is invalid
        return null;
    }
}