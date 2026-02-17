
import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Plus, ShoppingCart, Check, Trash2 } from 'lucide-react';
import type { GroceryItem } from '../../types/Grocery';
import { GroceryService } from '../../services/GroceryService';

interface GroceryListProps {
    initialItems: GroceryItem[];
}

export const GroceryList: React.FC<GroceryListProps> = ({ initialItems }) => {
    const [items, setItems] = useState(initialItems);
    const [inputValue, setInputValue] = useState('');

    const toggleItem = async (id: string) => {
        const item = items.find(i => i.id === id);
        if (!item) return;

        const newChecked = !item.checked;

        // Optimistic update
        setItems(items.map(i =>
            i.id === id ? { ...i, checked: newChecked } : i
        ));

        try {
            await GroceryService.toggleItem(id, newChecked);
        } catch (error) {
            console.error("Failed to toggle item", error);
            // Revert on error
            setItems(items.map(i =>
                i.id === id ? { ...i, checked: !newChecked } : i
            ));
        }
    };

    const addItem = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const name = inputValue;
        setInputValue(''); // Clear input immediately

        try {
            const newItem = await GroceryService.addItem(name);
            setItems([...items, newItem]);
        } catch (error) {
            console.error("Failed to add item", error);
            setInputValue(name); // Restore input on error
        }
    };

    const deleteItem = async (id: string) => {
        const oldItems = [...items];
        setItems(items.filter(i => i.id !== id));

        try {
            await GroceryService.deleteItem(id);
        } catch (error) {
            console.error("Failed to delete item", error);
            setItems(oldItems); // Revert
        }
    }

    return (
        <Card className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-serif font-bold text-xl text-gray-900">Lista de Compras</h3>
                <button className="bg-orange-50 text-orange-600 p-2 rounded-full hover:bg-orange-100 transition-colors">
                    <Plus size={20} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar mb-6">
                {items.length === 0 && (
                    <div className="text-center text-gray-400 py-6">
                        <p>Tu lista está vacía.</p>
                    </div>
                )}
                {items.map(item => (
                    <div
                        key={item.id}
                        className={`group flex items-center justify-between p-3 rounded-xl transition-all ${item.checked ? 'bg-gray-50' : 'bg-white hover:bg-gray-50 border border-gray-100'}`}
                    >
                        <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => toggleItem(item.id)}>
                            <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${item.checked ? 'bg-green-500 border-green-500' : 'border-gray-200 group-hover:border-gray-300'}`}>
                                {item.checked && <Check size={14} className="text-white" strokeWidth={3} />}
                            </div>
                            <span className={`font-medium ${item.checked ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                                {item.name}
                            </span>
                        </div>
                        <button
                            onClick={() => deleteItem(item.id)}
                            className="text-gray-300 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
            </div>

            <form onSubmit={addItem} className="mt-auto">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Agregar ingrediente..."
                        className="w-full pl-10 pr-4 py-3 rounded-full border border-dashed border-gray-300 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-gray-50 hover:bg-white transition-colors"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <ShoppingCart size={16} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
            </form>
        </Card>
    );
};
