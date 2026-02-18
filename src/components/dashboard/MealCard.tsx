
import React from 'react';
import { Clock, Flame, Edit2, Trash2, MoreVertical } from 'lucide-react';
import { Card } from '../ui/Card';
import type { Meal } from '../../types/Meal';

interface MealCardProps {
    meal: Meal;
    onEdit?: (meal: Meal) => void;
    onDelete?: (id: string) => void;
}

export const MealCard: React.FC<MealCardProps> = ({ meal, onEdit, onDelete }) => {
    const [showMenu, setShowMenu] = React.useState(false);

    return (
        <Card className="group hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-200 overflow-visible relative bg-white/50 backdrop-blur-sm hover:bg-white">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Image */}
                <div className="w-full md:w-32 h-32 flex-shrink-0 rounded-2xl overflow-hidden relative shadow-md group-hover:shadow-lg transition-shadow">
                    <img
                        src={meal.image}
                        alt={meal.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-gray-800 shadow-sm border border-gray-100/50">
                        {meal.type}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                        <div className="flex justify-between items-start">
                            <h3 className="font-serif font-bold text-xl text-gray-900 mb-1 group-hover:text-orange-600 transition-colors tracking-tight">
                                {meal.title}
                            </h3>
                            <div className="relative">
                                <button
                                    className="p-1.5 text-gray-400 hover:text-orange-500 rounded-full hover:bg-orange-50 transition-colors opacity-0 group-hover:opacity-100"
                                    onClick={() => setShowMenu(!showMenu)}
                                >
                                    <MoreVertical size={18} />
                                </button>
                                {showMenu && (
                                    <div className="absolute right-0 top-8 bg-white shadow-xl rounded-xl border border-gray-100 p-1 min-w-[140px] z-10 animate-in fade-in zoom-in-50 duration-200">
                                        <button
                                            onClick={() => { onEdit?.(meal); setShowMenu(false); }}
                                            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg hover:text-blue-600 transition-colors"
                                        >
                                            <Edit2 size={14} /> Editar
                                        </button>
                                        <button
                                            onClick={() => { onDelete?.(meal.id); setShowMenu(false); }}
                                            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={14} /> Eliminar
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">{meal.description}</p>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                        <div className="flex items-center gap-1.5 bg-orange-50 text-orange-700 px-3 py-1.5 rounded-full text-xs font-semibold border border-orange-100">
                            <Flame size={12} fill="currentColor" />
                            {meal.calories} kcal
                        </div>
                        <div className="flex items-center gap-1.5 bg-gray-50 text-gray-600 px-3 py-1.5 rounded-full text-xs font-semibold border border-gray-100">
                            <Clock size={12} />
                            {meal.time} min
                        </div>
                        <div className="flex gap-3 text-xs text-gray-400 ml-auto font-medium">
                            <span title="Proteína" className="hover:text-blue-500 transition-colors"><b>{meal.protein}g</b> P</span>
                            <span title="Carbohidratos" className="hover:text-yellow-500 transition-colors"><b>{meal.carbs}g</b> C</span>
                            <span title="Grasas" className="hover:text-purple-500 transition-colors"><b>{meal.fat}g</b> G</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};
