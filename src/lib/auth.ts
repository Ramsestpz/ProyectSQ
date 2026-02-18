
import { randomBytes, scrypt, timingSafeEqual } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export const Auth = {
    /**
     * Get user ID from request cookies
     */
    getUserFromRequest: (request: Request): string | null => {
        const cookieHeader = request.headers.get('cookie');
        if (!cookieHeader) return null;

        const cookies = Object.fromEntries(cookieHeader.split('; ').map(c => c.split('=')));
        const session = cookies['session'];

        if (!session) return null;
        return Auth.verifySessionToken(session);
    },

    /**
     * Hash a password using scrypt
     */
    hashPassword: async (password: string): Promise<string> => {
        const salt = randomBytes(16).toString('hex');
        const buf = (await scryptAsync(password, salt, 64)) as Buffer;
        return `${buf.toString('hex')}.${salt}`;
    },

    /**
     * Verify a password against a hash
     */
    verifyPassword: async (password: string, storedHash: string): Promise<boolean> => {
        const [hash, salt] = storedHash.split('.');
        if (!hash || !salt) return false;

        const hashBuf = Buffer.from(hash, 'hex');
        const suppliedBuf = (await scryptAsync(password, salt, 64)) as Buffer;
        return timingSafeEqual(hashBuf, suppliedBuf);
    },

    /**
     * Create a simple session cookie string
     */
    createSessionToken: (userId: number | string): string => {
        return Buffer.from(`${userId}:${Date.now()}`).toString('base64');
    },

    verifySessionToken: (token: string): string | null => {
        try {
            const decoded = Buffer.from(token, 'base64').toString('utf-8');
            const [userId] = decoded.split(':');
            return userId;
        } catch {
            return null;
        }
    }
};
