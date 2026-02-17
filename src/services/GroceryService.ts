
import type { GroceryItem } from '../types/Grocery';

export const GroceryService = {
    getItems: async (): Promise<GroceryItem[]> => {
        try {
            const isBrowser = typeof window !== 'undefined';
            const baseUrl = isBrowser ? '' : 'http://localhost:4321';

            const response = await fetch(`${baseUrl}/api/grocery`);
            if (!response.ok) throw new Error('Failed to fetch');
            return await response.json();
        } catch (error) {
            console.error("Error fetching grocery items:", error);
            return [];
        }
    },

    addItem: async (name: string): Promise<GroceryItem> => {
        const response = await fetch('/api/grocery', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, checked: false })
        });
        const data = await response.json();
        return { id: data.id, name, checked: false };
    },

    toggleItem: async (id: string, checked: boolean): Promise<void> => {
        await fetch(`/api/grocery/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ checked })
        });
    },

    deleteItem: async (id: string): Promise<void> => {
        await fetch(`/api/grocery/${id}`, {
            method: 'DELETE'
        });
    }
};
