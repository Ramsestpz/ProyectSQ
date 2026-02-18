
import { useState } from 'react';
import { Menu, X, LogOut, PieChart, Home } from 'lucide-react';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            window.location.href = '/login';
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 mb-8 sticky top-0 z-40 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <a href="/" className="font-serif text-2xl font-bold text-gray-900 flex items-center gap-2 tracking-tight group">
                                <span className="bg-orange-500 text-white p-1.5 rounded-xl shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform duration-300">NP</span>
                                <span className="text-gray-900 group-hover:text-orange-600 transition-colors">NutriPlan</span>
                            </a>
                        </div>
                        <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
                            <a href="/" className="border-transparent text-gray-500 hover:text-orange-600 inline-flex items-center px-1 pt-1 border-b-2 font-medium transition-all duration-200 text-sm hover:border-orange-500">
                                <Home size={18} className="mr-2" />
                                Dashboard
                            </a>
                            <a href="/profile" className="border-transparent text-gray-500 hover:text-orange-600 inline-flex items-center px-1 pt-1 border-b-2 font-medium transition-all duration-200 text-sm hover:border-orange-500">
                                <PieChart size={18} className="mr-2" />
                                Mi Perfil
                            </a>
                        </div>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 bg-gray-50 hover:bg-red-50 text-gray-600 hover:text-red-600 px-4 py-2 rounded-full transition-all duration-200 border border-transparent hover:border-red-100 group"
                            title="Cerrar Sesión"
                        >
                            <span className="text-sm font-medium">Salir</span>
                            <LogOut size={18} className="group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </div>
                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none transition-colors"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="sm:hidden bg-white border-b border-gray-100 shadow-xl absolute w-full z-50 animate-in slide-in-from-top-2 duration-200">
                    <div className="pt-2 pb-4 space-y-1 px-4">
                        <a href="/" className="bg-orange-50 text-orange-700 block px-4 py-3 rounded-xl text-base font-medium mb-2">
                            Dashboard
                        </a>
                        <a href="/profile" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 block px-4 py-3 rounded-xl text-base font-medium mb-2">
                            Mi Perfil
                        </a>
                        <button
                            onClick={handleLogout}
                            className="w-full text-left text-red-600 hover:bg-red-50 block px-4 py-3 rounded-xl text-base font-medium transition-colors"
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};
