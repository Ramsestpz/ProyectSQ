
import type { APIRoute } from 'astro';

export const POST: APIRoute = async () => {
    return new Response(JSON.stringify({ message: 'Logged out' }), {
        status: 200,
        headers: {
            'Set-Cookie': 'session=; Path=/; Max-Age=0; HttpOnly; SameSite=Strict',
            'Content-Type': 'application/json'
        }
    });
};
