
import type { APIRoute } from 'astro';
import pool from '../../../lib/db';
import { Auth } from '../../../lib/auth';

export const GET: APIRoute = async ({ request }) => {

    const url = new URL(request.url);
    const date = url.searchParams.get('date');
    const userId = Auth.getUserFromRequest(request);

    if (!userId) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    try {
        let query = 'SELECT * FROM meals WHERE user_id = ?';
        const params: any[] = [userId];

        if (date) {
            query += ' AND date = ?';
            params.push(date);
        }

        const [rows] = await pool.query(query, params);

        const meals = (rows as any[]).map(row => ({
            id: row.id.toString(),
            title: row.title,
            description: row.description,
            calories: row.calories,
            protein: row.protein,
            carbs: row.carbs,
            fat: row.fat,
            image: row.image_url || 'https://via.placeholder.com/150',
            time: row.preparation_time,
            type: row.meal_type,
            date: typeof row.date === 'string' ? row.date : row.date.toISOString().split('T')[0],
            isVegetarian: Boolean(row.is_vegetarian)
        }));

        return new Response(JSON.stringify(meals), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Database error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const userId = Auth.getUserFromRequest(request);

        if (!userId) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
        }

        const query = `
            INSERT INTO meals 
            (user_id, title, description, calories, protein, carbs, fat, preparation_time, meal_type, date, is_vegetarian, image_url)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            userId,
            body.title,
            body.description,
            body.calories,
            body.protein,
            body.carbs,
            body.fat,
            body.time,      // mapped from body.time to preparation_time
            body.type,
            body.date,
            body.isVegetarian,
            body.image      // mapped from body.image to image_url
        ];

        const [result] = await pool.query(query, values);

        return new Response(JSON.stringify({
            message: "Meal added",
            id: (result as any).insertId
        }), { status: 201 });

    } catch (e) {
        console.error("Error adding meal:", e);
        return new Response(JSON.stringify({ error: "Bad request" }), { status: 400 });
    }
}
