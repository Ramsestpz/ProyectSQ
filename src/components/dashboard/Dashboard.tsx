
import React, { useState, useEffect } from 'react';
import { DailyMealPlan } from './DailyMealPlan';
import { NutritionProgress } from './NutritionProgress';
import { GroceryList } from './GroceryList';
import { AIPlanGenerator } from './AIPlanGenerator';
import type { Meal } from '../../types/Meal';
import type { NutritionProgress as NutritionType } from '../../types/Nutrition';
import type { GroceryItem } from '../../types/Grocery';
import { MealService } from '../../services/MealService';
import { MealModal } from './MealModal';
import { Plus } from 'lucide-react';

interface DashboardProps {
    initialMeals: Meal[];
    initialProgress: NutritionType;
    initialGroceryItems: GroceryItem[];
}

export const Dashboard: React.FC<DashboardProps> = ({
    initialMeals,
    initialProgress,
    initialGroceryItems
}) => {
    const [date, setDate] = useState(new Date());
    const [meals, setMeals] = useState<Meal[]>(initialMeals);
    const [progress, setProgress] = useState<NutritionType>(initialProgress);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMeal, setEditingMeal] = useState<Meal | undefined>(undefined);

    // Track mount state to skip initial fetch (data provided by server)
    const mounted = React.useRef(false);

    // Fetch meals when date changes
    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true;
            return;
        }

        const fetchMeals = async () => {
            try {
                const fetchedMeals = await MealService.getMeals(date);
                setMeals(fetchedMeals);
            } catch (e) {
                console.error("Failed to fetch meals", e);
                setMeals([]);
            }
        };
        fetchMeals();
    }, [date]);

    // Recalculate progress when meals change
    useEffect(() => {
        const total = meals.reduce((acc, meal) => ({
            calories: acc.calories + meal.calories,
            protein: acc.protein + meal.protein,
            carbs: acc.carbs + meal.carbs,
            fat: acc.fat + meal.fat
        }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

        setProgress(prev => ({
            ...prev,
            calories: { ...prev.calories, current: total.calories },
            protein: { ...prev.protein, current: total.protein },
            carbs: { ...prev.carbs, current: total.carbs },
            fat: { ...prev.fat, current: total.fat }
        }));
    }, [meals]);

    const handlePlanGenerated = (newMeals: Meal[]) => {
        setMeals(newMeals);
    };

    const handleAddMeal = () => {
        setEditingMeal(undefined);
        setIsModalOpen(true);
    };

    const handleEditMeal = (meal: Meal) => {
        setEditingMeal(meal);
        setIsModalOpen(true);
    };

    const handleDeleteMeal = async (id: string) => {
        if (!confirm('¿Estás seguro de que quieres eliminar esta comida?')) return;

        try {
            await MealService.deleteMeal(id);
            setMeals(meals.filter(m => m.id !== id));
        } catch (error) {
            console.error('Error deleting meal', error);
            alert('Error al eliminar la comida');
        }
    };

    const handleSaveMeal = async (mealData: Partial<Meal>) => {
        try {
            if (editingMeal) {
                // Update
                await MealService.updateMeal(editingMeal.id, mealData);
                setMeals(meals.map(m => m.id === editingMeal.id ? { ...m, ...mealData } as Meal : m));
            } else {
                // Create
                const newMeal = await MealService.addMeal({
                    ...mealData,
                    date: date.toISOString().split('T')[0] // Use current selected date
                } as any);
                setMeals([...meals, newMeal]);
            }
        } catch (error) {
            console.error('Error saving meal', error);
            alert('Error al guardar la comida');
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8 pb-12">
            {/* Left Column: Meal Plan */}
            <div className="lg:col-span-2 space-y-8">
                <AIPlanGenerator onPlanGenerated={handlePlanGenerated} date={date} />
                <DailyMealPlan
                    meals={meals}
                    date={date}
                    onDateChange={setDate}
                    onEdit={handleEditMeal}
                    onDelete={handleDeleteMeal}
                />
            </div>

            {/* Right Column: Nutrition & Grocery */}
            <div className="flex flex-col gap-8">
                <div className="h-auto">
                    <NutritionProgress data={progress} />
                </div>
                <div className="flex-1 min-h-[400px]">
                    <GroceryList initialItems={initialGroceryItems} />
                </div>
            </div>

            {/* Floating Action Button */}
            <button
                onClick={handleAddMeal}
                className="fixed bottom-8 right-8 bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-lg shadow-orange-500/40 transition-transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-orange-200 z-30"
            >
                <Plus size={24} />
            </button>

            <MealModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSaveMeal}
                initialData={editingMeal}
            />
        </div>
    );
};
