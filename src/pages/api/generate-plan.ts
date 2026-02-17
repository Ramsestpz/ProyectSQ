
import type { APIRoute } from 'astro';
import { AIService, type UserPreferences } from '../../services/AIService';

import { Auth } from '../../lib/auth';
import pool from '../../lib/db';

export const POST: APIRoute = async ({ request }) => {
    const userId = Auth.getUserFromRequest(request);
    if (!userId) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    try {
        const data = await request.json();
        const preferences: UserPreferences = data.preferences;
        const date = data.date || new Date().toISOString().split('T')[0];

        if (!preferences) {
            return new Response(JSON.stringify({ error: 'Preferences are required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const generatedMeals = await AIService.generateDailyPlan(preferences, date);

        // Save to Database
        const savedMeals = [];
        const query = `
            INSERT INTO meals 
            (user_id, title, description, calories, protein, carbs, fat, preparation_time, meal_type, date, is_vegetarian, image_url)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        for (const meal of generatedMeals) {
            const values = [
                userId,
                meal.title,
                meal.description,
                meal.calories,
                meal.protein,
                meal.carbs,
                meal.fat,
                meal.time,
                meal.type,
                meal.date,
                meal.isVegetarian ? 1 : 0, // Ensure boolean is converted to 1/0 for SQL
                meal.image
            ];

            const [result] = await pool.query(query, values);
            savedMeals.push({
                ...meal,
                id: (result as any).insertId.toString()
            });
        }

        return new Response(JSON.stringify({ meals: savedMeals }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error generating plan:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
