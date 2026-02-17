
import type { Meal } from '../types/Meal';

export const MealService = {
    getMeals: async (date: Date): Promise<Meal[]> => {
        const dateString = date.toISOString().split('T')[0];
        try {
            const isBrowser = typeof window !== 'undefined';
            const baseUrl = isBrowser ? '' : 'http://localhost:4321';

            const response = await fetch(`${baseUrl}/api/meals?date=${dateString}`);
            if (!response.ok) throw new Error('Failed to fetch');
            return await response.json();
        } catch (error) {
            console.error("Error fetching meals:", error);
            // Fallback for demo if DB fails or empty
            return [];
        }
    },

    addMeal: async (meal: Omit<Meal, 'id'>): Promise<Meal> => {
        const response = await fetch('/api/meals', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(meal)
        });

        if (!response.ok) throw new Error('Failed to add meal');
        const data = await response.json();
        return { ...meal, id: data.id };
    },

    deleteMeal: async (id: string): Promise<void> => {
        const response = await fetch(`/api/meals/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete meal');
    },

    updateMeal: async (id: string, meal: Partial<Meal>): Promise<void> => {
        const response = await fetch(`/api/meals/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(meal)
        });
        if (!response.ok) throw new Error('Failed to update meal');
    }
};

