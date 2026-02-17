
import React from 'react';
import { Card } from '../ui/Card';
import { Flame, Activity, Zap, Droplet } from 'lucide-react';
import type { NutritionProgress as NutritionType } from '../../types/Nutrition';

interface NutritionProgressProps {
    data: NutritionType;
}

export const NutritionProgress: React.FC<NutritionProgressProps> = ({ data }) => {

    const calculatePercentage = (current: number, target: number) => {
        return Math.min(100, Math.round((current / target) * 100));
    };

    return (
        <Card className="bg-white text-gray-900 overflow-hidden relative shadow-lg border border-gray-100 ring-4 ring-gray-50/50">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100/50 rounded-full blur-[80px] transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-100/50 rounded-full blur-[60px] transform -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

            <div className="relative z-10">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h3 className="font-serif font-bold text-xl tracking-tight text-gray-900">Tu Progreso</h3>
                        <p className="text-gray-500 text-xs mt-0.5 font-medium">Objetivos Diarios</p>
                    </div>
                </div>

                {/* Main Calories Circle */}
                <div className="flex items-center gap-8 mb-10">
                    <div className="relative w-28 h-28 flex-shrink-0 group">
                        <div className="absolute inset-0 bg-orange-500/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                        <svg className="w-full h-full transform -rotate-90 relative">
                            <circle
                                cx="56"
                                cy="56"
                                r="46"
                                stroke="currentColor"
                                strokeWidth="8"
                                fill="transparent"
                                className="text-gray-100"
                            />
                            <circle
                                cx="56"
                                cy="56"
                                r="46"
                                stroke="currentColor"
                                strokeWidth="8"
                                fill="transparent"
                                strokeDasharray={2 * Math.PI * 46}
                                strokeDashoffset={2 * Math.PI * 46 * (1 - calculatePercentage(data.calories.current, data.calories.target) / 100)}
                                className="text-orange-500 transition-all duration-1000 ease-out"
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <Flame size={20} className="text-orange-500 mb-1 fill-orange-500" />
                            <span className="text-2xl font-bold text-gray-900">{Math.round(data.calories.current)}</span>
                            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Kcal</span>
                        </div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold font-serif mb-1 tracking-tight text-gray-900">{Math.max(0, data.calories.target - data.calories.current)}</div>
                        <div className="text-sm text-gray-500 font-medium">calorías restantes</div>
                        <div className="text-xs text-orange-600 font-medium mt-1 bg-orange-50 inline-block px-2 py-0.5 rounded-full">
                            Meta: {data.calories.target}
                        </div>
                    </div>
                </div>

                {/* Macros */}
                <div className="space-y-6">
                    <div className="space-y-2 group">
                        <div className="flex justify-between text-sm items-end">
                            <span className="text-gray-600 flex items-center gap-2 font-medium">
                                <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.3)]"></span>
                                Proteína
                            </span>
                            <span className="font-medium text-gray-900"><span className="text-lg font-bold">{Math.round(data.protein.current)}</span> <span className="text-gray-400 text-xs">/ {data.protein.target}g</span></span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-blue-500 rounded-full transition-all duration-1000 group-hover:shadow-[0_0_10px_rgba(59,130,246,0.2)]"
                                style={{ width: `${calculatePercentage(data.protein.current, data.protein.target)}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="space-y-2 group">
                        <div className="flex justify-between text-sm items-end">
                            <span className="text-gray-600 flex items-center gap-2 font-medium">
                                <span className="w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.3)]"></span>
                                Carbohidratos
                            </span>
                            <span className="font-medium text-gray-900"><span className="text-lg font-bold">{Math.round(data.carbs.current)}</span> <span className="text-gray-400 text-xs">/ {data.carbs.target}g</span></span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-yellow-400 rounded-full transition-all duration-1000 group-hover:shadow-[0_0_10px_rgba(250,204,21,0.2)]"
                                style={{ width: `${calculatePercentage(data.carbs.current, data.carbs.target)}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="space-y-2 group">
                        <div className="flex justify-between text-sm items-end">
                            <span className="text-gray-600 flex items-center gap-2 font-medium">
                                <span className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.3)]"></span>
                                Grasas
                            </span>
                            <span className="font-medium text-gray-900"><span className="text-lg font-bold">{Math.round(data.fat.current)}</span> <span className="text-gray-400 text-xs">/ {data.fat.target}g</span></span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-purple-400 rounded-full transition-all duration-1000 group-hover:shadow-[0_0_10px_rgba(192,132,252,0.2)]"
                                style={{ width: `${calculatePercentage(data.fat.current, data.fat.target)}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};
