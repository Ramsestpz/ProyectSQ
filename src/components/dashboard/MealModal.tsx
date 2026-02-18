
import React, { useState, useEffect } from 'react';
import { X, Clock, Flame } from 'lucide-react';
import type { Meal } from '../../types/Meal';
import { Button } from '../ui/Button';

interface MealModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (meal: Partial<Meal>) => void;
    initialData?: Meal;
}

export const MealModal: React.FC<MealModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
    const [formData, setFormData] = useState<Partial<Meal>>({
        title: '',
        description: '',
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        time: 15,
        type: 'Breakfast',
        isVegetarian: false
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                title: '',
                description: '',
                calories: 0,
                protein: 0,
                carbs: 0,
                fat: 0,
                time: 15,
                type: 'Breakfast',
                isVegetarian: false
            });
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-900/10 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                    <h2 className="text-2xl font-serif font-bold text-gray-900">
                        {initialData ? 'Editar Comida' : 'Agregar Comida'}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Platillo</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                            placeholder="ej. Tostada de Aguacate"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                        <textarea
                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                            rows={3}
                            placeholder="Breve descripción..."
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                            <select
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 transition-all"
                                value={formData.type}
                                onChange={e => setFormData({ ...formData, type: e.target.value as any })}
                            >
                                <option value="Breakfast">Desayuno</option>
                                <option value="Lunch">Comida</option>
                                <option value="Dinner">Cena</option>
                                <option value="Snack">Snack</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                                <Clock size={14} /> Tiempo Prep (min)
                            </label>
                            <input
                                type="number"
                                min="0"
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 transition-all"
                                value={formData.time}
                                onChange={e => setFormData({ ...formData, time: Number(e.target.value) })}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-medium text-gray-900 border-b pb-2">Información Nutricional</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1 uppercase flex items-center gap-1">
                                    <Flame size={12} className="text-orange-500" /> Calorías
                                </label>
                                <input
                                    type="number"
                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500 transition-all"
                                    value={formData.calories}
                                    onChange={e => setFormData({ ...formData, calories: Number(e.target.value) })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1 uppercase">Proteína (g)</label>
                                <input
                                    type="number"
                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500 transition-all"
                                    value={formData.protein}
                                    onChange={e => setFormData({ ...formData, protein: Number(e.target.value) })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1 uppercase">Carbohidratos (g)</label>
                                <input
                                    type="number"
                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500 transition-all"
                                    value={formData.carbs}
                                    onChange={e => setFormData({ ...formData, carbs: Number(e.target.value) })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1 uppercase">Grasas (g)</label>
                                <input
                                    type="number"
                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500 transition-all"
                                    value={formData.fat}
                                    onChange={e => setFormData({ ...formData, fat: Number(e.target.value) })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button type="submit" variant="primary" className="w-full md:w-auto">
                            {initialData ? 'Guardar Cambios' : 'Agregar Comida'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
