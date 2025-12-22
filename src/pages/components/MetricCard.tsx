import React, { type ComponentType } from 'react';

interface MetricCardProps {
    title: string;
    value: string | number;
    icon: ComponentType<{ className?: string; strokeWidth?: number }>;
    color: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon: Icon, color }) => {
    return (
        <div className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4 transition-transform active:scale-[0.98]">
            <div
                className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${color}15` }}
            >
                <Icon
                    className="w-7 h-7"
                    style={{ color }}
                    strokeWidth={2.5}
                />
            </div>

            <div className="flex-1">
                <p className="text-gray-500 text-sm mb-1">{title}</p>
                <p
                    className="text-gray-900"
                    style={{ fontSize: '28px', fontWeight: '700', lineHeight: '1' }}
                >
                    {value}
                </p>
            </div>
        </div>
    );
};
