
import type { NutritionProgress } from '../types/Nutrition';

export const NutritionService = {
    getProgress: async (): Promise<NutritionProgress> => {
        try {
            const isBrowser = typeof window !== 'undefined';
            const baseUrl = isBrowser ? '' : 'http://localhost:4321';

            const response = await fetch(`${baseUrl}/api/nutrition`);
            if (!response.ok) throw new Error('Failed to fetch nutrition');
            return await response.json();
        } catch (error) {
            console.error("Error fetching nutrition:", error);
            // Fallback default
            return {
                calories: { current: 0, target: 2000 },
                protein: { current: 0, target: 150 },
                carbs: { current: 0, target: 250 },
                fat: { current: 0, target: 70 },
                weeklyProtein: []
            };
        }
    }
};
