import React from 'react';
import { Truck, Warehouse } from 'lucide-react';
import type { InventoryLocation } from '../../domain/entities';

interface InventoryTabsProps {
  activeTab: InventoryLocation;
  onTabChange: (tab: InventoryLocation) => void;
}

const TABS: { id: InventoryLocation; label: string; icon: React.ReactNode }[] = [
  { id: 'route', label: 'En Ruta', icon: <Truck className="w-4 h-4" /> },
  { id: 'warehouse', label: 'En Bodega', icon: <Warehouse className="w-4 h-4" /> },
];

/**
 * InventoryTabs Component
 * Single Responsibility: Only handles tab navigation for inventory locations
 */
export const InventoryTabs: React.FC<InventoryTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
            activeTab === tab.id
              ? 'bg-white text-[var(--color-primary)] shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
};
