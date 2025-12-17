import React from 'react';
import { X, MapPin, Users, Package, DollarSign, User } from 'lucide-react';
import type {NavScreen} from './BottomNav';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: NavScreen | 'profile') => void;
  userName: string;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, onNavigate, userName }) => {
  if (!isOpen) return null;

  const menuItems = [
    { id: 'routes' as NavScreen, label: 'Rutas', icon: MapPin },
    { id: 'clients' as NavScreen, label: 'Clientes', icon: Users },
    { id: 'inventory' as NavScreen, label: 'Inventario', icon: Package },
    { id: 'sales' as NavScreen, label: 'Ventas', icon: DollarSign },
    { id: 'profile' as const, label: 'Mi Perfil', icon: User },
  ];

  const handleNavigate = (screen: NavScreen | 'profile') => {
    onNavigate(screen);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50 animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Menu */}
      <div className="fixed top-0 right-0 bottom-0 w-[280px] bg-white shadow-2xl z-50 animate-in slide-in-from-right duration-300">
        {/* Header del menú */}
        <div className="bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary-dark)] to-[var(--color-secondary)] p-6 pb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-white mb-1" style={{ fontSize: '18px', fontWeight: '700' }}>
                {userName}
              </h3>
              <p className="text-white/80 text-sm">Vendedor</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-transform active:scale-95"
            >
              <X className="w-5 h-5 text-white" strokeWidth={2.5} />
            </button>
          </div>
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
            <User className="w-8 h-8 text-white" strokeWidth={2} />
          </div>
        </div>

        {/* Opciones del menú */}
        <div className="py-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className="w-full flex items-center gap-4 px-6 py-4 transition-colors hover:bg-gray-50 active:bg-gray-100"
              >
                <Icon className="w-5 h-5 text-gray-600" strokeWidth={2} />
                <span className="text-gray-800" style={{ fontSize: '15px', fontWeight: '500' }}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
          <p className="text-gray-400 text-xs text-center">
            IWA OperativeApp v1.0
          </p>
        </div>
      </div>
    </>
  );
};
