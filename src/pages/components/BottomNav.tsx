import React from 'react';
import { Home, MapPin, Users, Package, ClipboardList } from 'lucide-react';

export type NavScreen = 'dashboard' | 'routes' | 'clients' | 'inventory' | 'orders';

interface BottomNavProps {
  activeScreen: NavScreen;
  onNavigate: (screen: NavScreen) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeScreen, onNavigate }) => {
  const navItems = [
    { id: 'dashboard' as NavScreen, label: 'Inicio', icon: Home },
    { id: 'routes' as NavScreen, label: 'Rutas', icon: MapPin },
    { id: 'clients' as NavScreen, label: 'Clientes', icon: Users },
    { id: 'inventory' as NavScreen, label: 'Inventario', icon: Package },
    { id: 'orders' as NavScreen, label: 'Pedidos', icon: ClipboardList },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex flex-col items-center justify-center gap-1 px-3 py-2 min-w-[64px] rounded-lg transition-all active:scale-95"
              style={{
                color: isActive ? 'var(--color-primary)' : '#9CA3AF',
              }}
            >
              <Icon 
                className="w-6 h-6" 
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span 
                className="text-xs"
                style={{ fontWeight: isActive ? '600' : '400' }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
