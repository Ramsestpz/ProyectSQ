
import React from 'react';

interface ProgressBarProps {
    current: number;
    target: number;
    color?: string;
    unit?: string;
    label?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
    current,
    target,
    color = 'bg-orange-500',
    unit = 'g',
    label
}) => {
    const percentage = Math.min((current / target) * 100, 100);

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-1">
                {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
                <div className="text-right text-xs text-gray-500">
                    <span className="font-bold text-gray-900">{current}{unit}</span> / <span className="text-gray-400">{target}{unit}</span>
                </div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                    className={`h-2 rounded-full ${color}`}
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
};
