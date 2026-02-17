
import type { Meal } from '../types/Meal';

// Define the shape of user preferences for the AI
export interface UserPreferences {
    goal: 'lose_weight' | 'gain_muscle' | 'maintain';
    dietaryRestrictions?: string[]; // e.g., 'vegetarian', 'gluten_free'
    caloriesTarget?: number;
}

const MEAL_OPTIONS = {
    Breakfast: [
        { title: 'Oatmeal with Berries', image: 'https://images.unsplash.com/photo-1517093724032-b258591f4d96?w=800' },
        { title: 'Avocado Toast & Eggs', image: 'https://images.unsplash.com/photo-1525351484163-7529414395d8?w=800' },
        { title: 'Greek Yogurt Parfait', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800' },
        { title: 'Protein Pancakes', image: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=800' }
    ],
    Lunch: [
        { title: 'Grilled Chicken Salad', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800' },
        { title: 'Quinoa Power Bowl', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800' },
        { title: 'Turkey Wrap', image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800' },
        { title: 'Lentil Soup', image: 'https://images.unsplash.com/photo-1547592166-23acbe346499?w=800' }
    ],
    Dinner: [
        { title: 'Baked Salmon', image: 'https://images.unsplash.com/photo-1467003909585-2f8a7270028d?w=800' },
        { title: 'Steak & Asparagus', image: 'https://images.unsplash.com/photo-1558030006-455952172553?w=800' },
        { title: 'Tofu Stir Fry', image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800' },
        { title: 'Herb Rosted Chicken', image: 'https://images.unsplash.com/photo-1598103356248-67f8051253d6?w=800' }
    ]
};

const getRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const AIService = {
    generateDailyPlan: async (preferences: UserPreferences, date: string): Promise<Meal[]> => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        const calorieModifier = preferences.goal === 'lose_weight' ? 0.8 : preferences.goal === 'gain_muscle' ? 1.2 : 1;
        const baseCalories = { Breakfast: 400, Lunch: 600, Dinner: 500 };

        const types: ('Breakfast' | 'Lunch' | 'Dinner')[] = ['Breakfast', 'Lunch', 'Dinner'];

        const mockGeneratedMeals: Meal[] = types.map((type, index) => {
            const option = getRandom(MEAL_OPTIONS[type]);
            const cals = Math.round(baseCalories[type] * calorieModifier);

            return {
                id: `ai-${Date.now()}-${index}`,
                title: option.title,
                description: `AI-optimized ${type.toLowerCase()} for your ${preferences.goal.replace('_', ' ')} goal.`,
                calories: cals,
                protein: Math.round(cals * 0.3 / 4), // 30% protein
                fat: Math.round(cals * 0.3 / 9),     // 30% fat
                carbs: Math.round(cals * 0.4 / 4),   // 40% carbs
                image: option.image,
                time: 15 + Math.floor(Math.random() * 30),
                type: type,
                date: date,
                isVegetarian: preferences.dietaryRestrictions?.includes('vegetarian') || false
            };
        });

        return mockGeneratedMeals;
    }
};
