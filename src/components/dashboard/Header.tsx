
import React, { useState } from 'react';
import { Search, Bell, Menu, UtensilsCrossed, X } from 'lucide-react';

interface HeaderProps {
    onSearch?: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-white border-b border-gray-100 py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50">
            <div className="flex items-center gap-2 md:gap-4">
                <button
                    className="md:hidden text-gray-500 hover:text-gray-900"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X /> : <Menu />}
                </button>
                <div className="flex items-center gap-2 text-orange-500">
                    <div className="bg-orange-100 p-2 rounded-xl">
                        <UtensilsCrossed size={20} />
                    </div>
                    <span className="font-serif font-bold text-xl text-gray-900 tracking-tight">NutriPlan</span>
                </div>
            </div>

            <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                    type="text"
                    placeholder="Search recipes, ingredients..."
                    className="w-full pl-12 pr-4 py-3 rounded-full bg-gray-50 border-none focus:ring-2 focus:ring-orange-100 placeholder-gray-400 text-sm transition-all"
                    onChange={(e) => onSearch?.(e.target.value)}
                />
            </div>

            <div className="flex items-center gap-4">
                <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Bell size={22} />
                    <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm cursor-pointer hover:ring-2 hover:ring-orange-500 transition-all">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="Profile" />
                </div>
            </div>

            {/* Mobile Menu (Simple overlay for now) */}
            {isMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-white border-b border-gray-100 p-4 md:hidden shadow-lg animate-in slide-in-from-top-2">
                    <nav className="flex flex-col gap-4">
                        <a href="#" className="text-gray-700 font-medium p-2 hover:bg-gray-50 rounded-lg">Meal Plan</a>
                        <a href="#" className="text-gray-700 font-medium p-2 hover:bg-gray-50 rounded-lg">Grocery List</a>
                        <a href="#" className="text-gray-700 font-medium p-2 hover:bg-gray-50 rounded-lg">Settings</a>
                    </nav>
                </div>
            )}
        </header>
    );
};
