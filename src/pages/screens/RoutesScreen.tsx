import React from 'react';
import { ScreenContainer } from '../components/ScreenContainer';
import type {NavScreen} from '../components/BottomNav';
import { MapPin, Navigation, Clock } from 'lucide-react';

interface RoutesScreenProps {
  onNavigate: (screen: NavScreen | 'profile') => void;
}

export const RoutesScreen: React.FC<RoutesScreenProps> = ({ onNavigate }) => {
  const routes = [
    { id: 1, name: 'Ruta Centro', clients: 8, completed: 5, estimatedTime: '2h 30min' },
    { id: 2, name: 'Ruta Norte', clients: 12, completed: 8, estimatedTime: '3h 15min' },
    { id: 3, name: 'Ruta Sur', clients: 6, completed: 3, estimatedTime: '1h 45min' },
  ];

  return (
    <ScreenContainer
      title="Rutas"
      activeScreen="routes"
      onNavigate={onNavigate}
      onProfileClick={() => onNavigate('profile')}
    >
      <div className="p-6">
        <div className="max-w-[390px] mx-auto">
          <h2 className="text-gray-800 mb-4" style={{ fontSize: '20px', fontWeight: '700' }}>
            Rutas del día
          </h2>

          <div className="space-y-4">
            {routes.map((route) => (
              <div
                key={route.id}
                className="bg-white rounded-2xl shadow-md p-5 transition-transform active:scale-[0.98]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#D0323A15] rounded-xl flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-[var(--color-primary)]" strokeWidth={2.5} />
                    </div>
                    <div>
                      <h3 className="text-gray-800" style={{ fontSize: '16px', fontWeight: '600' }}>
                        {route.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {route.completed}/{route.clients} clientes visitados
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{route.estimatedTime}</span>
                  </div>
                  <button className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg text-sm transition-transform active:scale-95" style={{ fontWeight: '600' }}>
                    Ver ruta
                  </button>
                </div>

                {/* Barra de progreso */}
                <div className="mt-4 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]"
                    style={{ width: `${(route.completed / route.clients) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
};
