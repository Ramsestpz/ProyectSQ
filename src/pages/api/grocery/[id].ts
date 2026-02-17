
import type { APIRoute } from 'astro';
import pool from '../../../lib/db';
import { Auth } from '../../../lib/auth';

export const DELETE: APIRoute = async ({ params, request }) => {
    const { id } = params;
    const userId = Auth.getUserFromRequest(request);

    if (!userId) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    try {
        await pool.query('DELETE FROM grocery_items WHERE id = ? AND user_id = ?', [id, userId]);
        return new Response(JSON.stringify({ message: 'Deleted' }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Server Error' }), { status: 500 });
    }
};

export const PATCH: APIRoute = async ({ params, request }) => {
    const { id } = params;
    const userId = Auth.getUserFromRequest(request);
    const body = await request.json();

    if (!userId) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    try {
        await pool.query(
            'UPDATE grocery_items SET is_checked = ? WHERE id = ?',
            [body.checked, id]
        );
        return new Response(JSON.stringify({ message: 'Updated' }), { status: 200 });
    } catch (e) {
        return new Response(JSON.stringify({ error: 'Server Error' }), { status: 500 });
    }
}
