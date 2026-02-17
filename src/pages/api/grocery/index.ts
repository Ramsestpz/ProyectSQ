
import type { APIRoute } from 'astro';
import pool from '../../../lib/db';
import { Auth } from '../../../lib/auth';

export const GET: APIRoute = async ({ request }) => {
    const userId = Auth.getUserFromRequest(request);

    if (!userId) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    try {
        const [rows] = await pool.query('SELECT * FROM grocery_items WHERE user_id = ?', [userId]);

        const items = (rows as any[]).map(row => ({
            id: row.id.toString(),
            name: row.name,
            checked: Boolean(row.is_checked)
        }));

        return new Response(JSON.stringify(items), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
};

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const userId = Auth.getUserFromRequest(request);

        if (!userId) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
        }

        const [result] = await pool.query(
            'INSERT INTO grocery_items (user_id, name, is_checked) VALUES (?, ?, ?)',
            [userId, body.name, body.checked || false]
        );

        return new Response(JSON.stringify({ id: (result as any).insertId }), { status: 201 });
    } catch (e) {
        return new Response(JSON.stringify({ error: "Bad Request" }), { status: 400 });
    }
}
