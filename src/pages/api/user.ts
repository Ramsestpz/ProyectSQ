
import type { APIRoute } from 'astro';
import pool from '../../lib/db';
import { Auth } from '../../lib/auth';

export const PUT: APIRoute = async ({ request }) => {
    const userId = Auth.getUserFromRequest(request);
    if (!userId) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    try {
        const body = await request.json();
        const { name, goal } = body;

        if (!name || !goal) {
            return new Response(JSON.stringify({ error: 'Name and goal are required' }), { status: 400 });
        }

        const [result]: any = await pool.query(
            'UPDATE users SET name = ?, goal = ? WHERE id = ?',
            [name, goal, userId]
        );

        if (result.affectedRows === 0) {
            return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
        }

        return new Response(JSON.stringify({ message: 'User updated successfully' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Database error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
};

export const DELETE: APIRoute = async ({ request, cookies }) => {
    const userId = Auth.getUserFromRequest(request);
    if (!userId) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    try {
        // Delete associated data first (optional if CASCADE is set up, but safer to be explicit or if CASCADE is not set)
        // Assuming CASCADE is set up for foreign keys, deleting user should be enough.
        // However, to be safe and ensure clean up if foreign keys are not strict:

        // We will assume ON DELETE CASCADE is NOT strictly relied upon for now or verify, 
        // but given the previous schema discussions, we might not have full cascade.
        // Actually, deleting the user *should* delete related records if FKs are correct.
        // Let's rely on standard FK constraints usually having cascade or we can do manual cleanup.
        // For robustness, I'll delete child records first.

        await pool.query('DELETE FROM daily_stats WHERE user_id = ?', [userId]);
        await pool.query('DELETE FROM grocery_items WHERE user_id = ?', [userId]);
        await pool.query('DELETE FROM meals WHERE user_id = ?', [userId]);
        await pool.query('DELETE FROM nutrient_targets WHERE user_id = ?', [userId]);

        // Delete user
        const [result]: any = await pool.query('DELETE FROM users WHERE id = ?', [userId]);

        if (result.affectedRows === 0) {
            return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
        }

        // Clear session cookie
        cookies.delete('session_id', { path: '/' });

        return new Response(JSON.stringify({ message: 'User deleted successfully' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Database error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
};
