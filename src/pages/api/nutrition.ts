
import type { APIRoute } from 'astro';
import pool from '../../lib/db';
import { Auth } from '../../lib/auth';

export const GET: APIRoute = async ({ request }) => {

    const userId = Auth.getUserFromRequest(request);

    if (!userId) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }


    try {
        const [rows] = await pool.query('SELECT * FROM nutrient_targets WHERE user_id = ?', [userId]);

        if ((rows as any[]).length === 0) {
            // Return default if not found
            return new Response(JSON.stringify({
                calories: { current: 0, target: 2000 },
                protein: { current: 0, target: 150 },
                carbs: { current: 0, target: 250 },
                fat: { current: 0, target: 70 },
                weeklyProtein: []
            }), { status: 200 });
        }

        const target = (rows as any[])[0];

        return new Response(JSON.stringify({
            calories: { current: 0, target: target.calories_target },
            protein: { current: 0, target: target.protein_target },
            carbs: { current: 0, target: target.carbs_target },
            fat: { current: 0, target: target.fat_target },
            weeklyProtein: [70, 80, 110, 90, 85, 95, 100] // Mock weekly data for now
        }), { status: 200 });
    } catch (error) {
        console.error('Database error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
};
