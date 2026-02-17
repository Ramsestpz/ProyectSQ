
import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import type { UserPreferences } from '../../services/AIService';
import type { Meal } from '../../types/Meal';

interface AIPlanGeneratorProps {
    onPlanGenerated: (meals: Meal[]) => void;
    date: Date;
}

export const AIPlanGenerator: React.FC<AIPlanGeneratorProps> = ({ onPlanGenerated, date }) => {
    const [loading, setLoading] = useState(false);
    const [goal, setGoal] = useState<UserPreferences['goal']>('maintain');

    const handleGenerate = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/generate-plan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    preferences: {
                        goal,
                        dietaryRestrictions: [],
                    },
                    date: date.toISOString().split('T')[0] // Pass selected date
                }),
            });

            if (response.ok) {
                const data = await response.json();
                onPlanGenerated(data.meals);
            } else {
                console.error('Failed to generate plan');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="mb-8 border-orange-100 bg-orange-50/50">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-full text-orange-600">
                        <Sparkles size={24} />
                    </div>
                    <div>
                        <h3 className="text-lg font-serif font-bold text-gray-900">Planificador con IA</h3>
                        <p className="text-sm text-gray-500">Genera un plan personalizado basado en tus metas.</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                    <select
                        value={goal}
                        onChange={(e) => setGoal(e.target.value as UserPreferences['goal'])}
                        className="px-4 py-2 rounded-full border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                    >
                        <option value="lose_weight">Perder Peso</option>
                        <option value="maintain">Mantenerse</option>
                        <option value="gain_muscle">Ganar Músculo</option>
                    </select>

                    <Button
                        onClick={handleGenerate}
                        className="w-full md:w-auto"
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="flex items-center">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Generando...
                            </div>
                        ) : (
                            'Generar Plan'
                        )}
                    </Button>
                </div>
            </div>
        </Card>
    );
};
