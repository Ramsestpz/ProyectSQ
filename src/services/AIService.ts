
import type { Meal } from '../types/Meal';

// Define the shape of user preferences for the AI
export interface UserPreferences {
    goal: 'lose_weight' | 'gain_muscle' | 'maintain';
    dietaryRestrictions?: string[]; // e.g., 'vegetarian', 'gluten_free'
    caloriesTarget?: number;
}

const MEAL_OPTIONS = {
    Breakfast: [
        { title: 'Oatmeal with Berries', image: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=800', description: 'Creamy oats topped with fresh antioxidant-rich berries.' },
        { title: 'Avocado Toast & Eggs', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800', description: 'Sourdough toast with mashed avocado and poached eggs.' },
        { title: 'Greek Yogurt Parfait', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800', description: 'Layers of thick Greek yogurt, honey, and crunchy granola.' },
        { title: 'Protein Pancakes', image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800', description: 'Fluffy pancakes made with whey protein and oat flour.' },
        { title: 'Chia Pudding', image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=800', description: 'Overnight chia seeds in almond milk with sliced fruits.' },
        { title: 'Spinach Omelette', image: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=800', description: 'Three-egg omelette filled with fresh baby spinach and feta.' }
    ],
    Lunch: [
        { title: 'Grilled Chicken Salad', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800', description: 'Mixed greens with char-grilled chicken breast and vinaigrette.' },
        { title: 'Quinoa Power Bowl', image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=800', description: 'Nutrient-dense quinoa with roasted chickpeas and veggies.' },
        { title: 'Turkey Wrap', image: 'https://images.unsplash.com/photo-1528736235302-52922df5c122?w=800', description: 'Lean turkey slices wrapped with lettuce and hummus.' },
        { title: 'Lentil Soup', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800', description: 'Hearty lentil soup spiced with cumin and coriander.' },
        { title: 'Poke Bowl', image: 'https://images.unsplash.com/photo-1546069901-eacef0df6022?w=800', description: 'Fresh tuna cubes over sushi rice with edamame and seaweed.' },
        { title: 'Vegetable Stir Fry', image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800', description: 'Crispy seasonal vegetables wok-fried in soy-ginger sauce.' }
    ],
    Dinner: [
        { title: 'Baked Salmon', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800', description: 'Oven-baked salmon fillet rich in Omega-3 fatty acids.' },
        { title: 'Steak & Asparagus', image: 'https://images.unsplash.com/photo-1546241072-48010ad28c2c?w=800', description: 'Grilled sirloin steak served with tender roasted asparagus.' },
        { title: 'Tofu Stir Fry', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800', description: 'Firm tofu cubes seared with broccoli and sesame oil.' },
        { title: 'Herb Roasted Chicken', image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=800', description: 'Quarter chicken roasted with rosemary, thyme, and lemon.' },
        { title: 'Zucchini Noodles', image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?w=800', description: 'Low-carb zucchini zoodles tossed in homemade basil pesto.' },
        { title: 'Shrimp Skewers', image: 'https://images.unsplash.com/photo-1534400293293-997971507c92?w=800', description: 'Marinated shrimp grilled to perfection on bamboo skewers.' }
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
                description: (option as any).description || `AI-optimized ${type.toLowerCase()} for your ${preferences.goal.replace('_', ' ')} goal.`,
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
