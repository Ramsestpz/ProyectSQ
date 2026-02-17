
import React from 'react';
import { MealCard } from './MealCard';
import type { Meal } from '../../types/Meal';

interface DailyMealPlanProps {
    meals: Meal[];
    date: Date;
    onDateChange: React.Dispatch<React.SetStateAction<Date>>;
    onEdit?: (meal: Meal) => void;
    onDelete?: (id: string) => void;
}

export const DailyMealPlan: React.FC<DailyMealPlanProps> = ({
    meals,
    date,
    onDateChange,
    onEdit,
    onDelete
}) => {
    const formatDate = (d: Date) => {
        // Spanish format
        return d.toLocaleDateString('es-ES', { weekday: 'long', month: 'long', day: 'numeric' });
    };

    const changeDate = (days: number) => {
        const newDate = new Date(date);
        newDate.setDate(date.getDate() + days);
        onDateChange(newDate);
    };

    const isToday = (d: Date) => {
        const today = new Date();
        return d.getDate() === today.getDate() &&
            d.getMonth() === today.getMonth() &&
            d.getFullYear() === today.getFullYear();
    };

    return (
        <div className="w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-4xl font-serif font-bold text-gray-900 mb-1 capitalize">Plan Diario</h1>
                    <p className="text-gray-500 font-medium capitalize">{formatDate(date)}</p>
                </div>

                <div className="flex items-center bg-white p-1 rounded-full shadow-sm border border-gray-100">
                    <button
                        onClick={() => changeDate(-1)}
                        className="px-4 py-2 rounded-full text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                    >
                        Ayer
                    </button>
                    <button
                        onClick={() => onDateChange(new Date())}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${isToday(date)
                            ? 'bg-orange-500 text-white shadow-md'
                            : 'text-gray-500 hover:bg-gray-50'
                            }`}
                    >
                        Hoy
                    </button>
                    <button
                        onClick={() => changeDate(1)}
                        className="px-4 py-2 rounded-full text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                    >
                        Mañana
                    </button>
                </div>
            </div>

            <div className="space-y-6">
                {meals.length > 0 ? (
                    meals.map(meal => (
                        <MealCard
                            key={meal.id}
                            meal={meal}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))
                ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                        <p className="text-gray-500">No hay comidas planeadas para hoy.</p>
                        <p className="text-sm text-gray-400 mt-2">¡Prueba generar un plan con IA o agrega una manualmente!</p>
                    </div>
                )}
            </div>
        </div>
    );
};
