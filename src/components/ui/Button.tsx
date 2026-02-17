
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'icon';
    size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

    const variants = {
        primary: 'bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500 shadow-lg shadow-orange-500/30',
        secondary: 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200',
        ghost: 'text-gray-500 hover:text-gray-900 hover:bg-gray-100',
        icon: 'p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full'
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg'
    };

    const classes = `${baseStyles} ${variants[variant]} ${variant !== 'icon' ? sizes[size] : ''} ${className}`;

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    );
};
