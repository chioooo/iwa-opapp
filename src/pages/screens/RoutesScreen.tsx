import React, { useState } from 'react';
import { ScreenContainer } from '../components/ScreenContainer';
import type {NavScreen} from '../components/BottomNav';
import { MapPin, Clock, Calendar } from 'lucide-react';
import { RouteDetailScreen } from './RouteDetailScreen';

interface Route {
  id: number;
  name: string;
  clients: number;
  completed: number;
  estimatedTime: string;
  date?: string;
  dateLabel?: string;
}

interface ScheduledRouteGroup {
  dateLabel: string;
  routes: Route[];
}

interface RoutesScreenProps {
  onNavigate: (screen: NavScreen | 'profile') => void;
}

export const RoutesScreen: React.FC<RoutesScreenProps> = ({ onNavigate }) => {
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);

  // Ruta de hoy
  const todayRoute: Route = { 
    id: 1, 
    name: 'Ruta Centro', 
    clients: 8, 
    completed: 5, 
    estimatedTime: '2h 30min' 
  };

  // Rutas programadas agrupadas por fecha
  const scheduledRoutes: ScheduledRouteGroup[] = [
    {
      dateLabel: 'Lunes, 23 de Dic.',
      routes: [
        { id: 2, name: 'Ruta Norte', clients: 12, completed: 0, estimatedTime: '3h 15min' },
        { id: 3, name: 'Ruta Poniente', clients: 6, completed: 0, estimatedTime: '1h 45min' },
      ]
    },
    {
      dateLabel: 'Martes, 24 de Dic.',
      routes: [
        { id: 4, name: 'Ruta Sur', clients: 10, completed: 0, estimatedTime: '2h 45min' },
      ]
    },
    {
      dateLabel: 'Jueves, 26 de Dic.',
      routes: [
        { id: 5, name: 'Ruta Centro', clients: 8, completed: 0, estimatedTime: '2h 30min' },
        { id: 6, name: 'Ruta Oriente', clients: 9, completed: 0, estimatedTime: '2h 00min' },
      ]
    },
  ];

  if (selectedRoute) {
    return (
      <RouteDetailScreen 
        route={selectedRoute} 
        onBack={() => setSelectedRoute(null)} 
      />
    );
  }

  return (
    <ScreenContainer
      title="Rutas"
      activeScreen="routes"
      onNavigate={onNavigate}
    >
      <div className="p-6">
        <div className="max-w-[390px] sm:max-w-full mx-auto">
          {/* Ruta de hoy */}
          <h2 className="text-gray-800 mb-4" style={{ fontSize: '20px', fontWeight: '700' }}>
            Ruta de hoy
          </h2>

          <div className="mb-8">
            <div
              className="bg-white rounded-2xl shadow-md p-5 transition-transform active:scale-[0.98] border-2 border-[var(--color-primary)]"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 bg-[var(--color-primary)] text-white text-xs font-semibold rounded-full">
                  HOY
                </span>
                <span className="text-xs text-gray-500">Domingo, 22 de Dic.</span>
              </div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#D0323A15] rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-[var(--color-primary)]" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="text-gray-800" style={{ fontSize: '16px', fontWeight: '600' }}>
                      {todayRoute.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {todayRoute.completed}/{todayRoute.clients} clientes visitados
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{todayRoute.estimatedTime}</span>
                </div>
                <button 
                  onClick={() => setSelectedRoute(todayRoute)}
                  className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg text-sm transition-transform active:scale-95" 
                  style={{ fontWeight: '600' }}
                >
                  Ver ruta
                </button>
              </div>

              {/* Barra de progreso */}
              <div className="mt-4 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]"
                  style={{ width: `${(todayRoute.completed / todayRoute.clients) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Rutas programadas */}
          <h2 className="text-gray-800 mb-4" style={{ fontSize: '20px', fontWeight: '700' }}>
            Rutas programadas
          </h2>

          <div className="space-y-6">
            {scheduledRoutes.map((group) => (
              <div key={group.dateLabel}>
                {/* Fecha header */}
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-semibold text-gray-600">{group.dateLabel}</span>
                </div>

                {/* Rutas del día */}
                <div className="space-y-3">
                  {group.routes.map((route) => (
                    <div
                      key={route.id}
                      className="bg-white rounded-2xl shadow-md p-5 transition-transform active:scale-[0.98]"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                            <MapPin className="w-6 h-6 text-gray-500" strokeWidth={2.5} />
                          </div>
                          <div>
                            <h3 className="text-gray-800" style={{ fontSize: '16px', fontWeight: '600' }}>
                              {route.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {route.clients} clientes
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{route.estimatedTime}</span>
                        </div>
                        <button 
                          onClick={() => setSelectedRoute(route)}
                          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm transition-transform active:scale-95" 
                          style={{ fontWeight: '600' }}
                        >
                          Ver detalles
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
};
