
import type { APIRoute } from 'astro';
import pool from '../../../lib/db';
import { Auth } from '../../../lib/auth';

export const DELETE: APIRoute = async ({ params, request }) => {
    const { id } = params;
    const userId = Auth.getUserFromRequest(request);

    if (!userId) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    if (!id) {
        return new Response(JSON.stringify({ error: 'ID required' }), { status: 400 });
    }

    try {
        await pool.query('DELETE FROM meals WHERE id = ? AND user_id = ?', [id, userId]);

        return new Response(JSON.stringify({ message: 'Meal deleted' }), {
            status: 200
        });
    } catch (error) {
        console.error('Database error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500
        });
    }
};

export const PUT: APIRoute = async ({ params, request }) => {
    const { id } = params;
    const userId = Auth.getUserFromRequest(request);
    const body = await request.json();

    if (!userId) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    if (!id) {
        return new Response(JSON.stringify({ error: 'ID required' }), { status: 400 });
    }

    try {
        const query = `
            UPDATE meals 
            SET title = ?, description = ?, calories = ?, protein = ?, carbs = ?, fat = ?, preparation_time = ?
            WHERE id = ? AND user_id = ?
        `;

        await pool.query(query, [
            body.title,
            body.description,
            body.calories,
            body.protein,
            body.carbs,
            body.fat,
            body.time,
            id,
            userId
        ]);

        return new Response(JSON.stringify({ message: 'Meal updated' }), {
            status: 200
        });
    } catch (error) {
        console.error('Database error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500
        });
    }
};
