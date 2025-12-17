import React from 'react';
import { MetricCard } from '../components/MetricCard';
import { Users, CheckCircle2, Package, DollarSign } from 'lucide-react';
import { ScreenContainer } from '../components/ScreenContainer';
import type {NavScreen} from '../components/BottomNav';

interface DashboardScreenProps {
  onNavigate: (screen: NavScreen | 'profile') => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ onNavigate }) => {
  const getCurrentDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Date().toLocaleDateString('es-ES', options);
  };

  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 19) return 'Buenas tardes';
    return 'Buenas noches';
  };

  return (
    <ScreenContainer
      title="IWA OperativeApp"
      activeScreen="dashboard"
      onNavigate={onNavigate}
      onProfileClick={() => onNavigate('profile')}
    >
      <div className="p-6">
        <div className="max-w-[390px] mx-auto">
          {/* Saludo */}
          <div className="mb-6">
            <h2 className="text-gray-800 mb-1" style={{ fontSize: '24px', fontWeight: '700' }}>
              {getCurrentGreeting()}, Carlos
            </h2>
            <p className="text-gray-500 capitalize">
              {getCurrentDate()}
            </p>
          </div>

          {/* Métricas */}
          <div className="space-y-4">
            <MetricCard
              title="Clientes a visitar"
              value="12"
              icon={Users}
              color="#D0323A"
            />
            <MetricCard
              title="Clientes visitados"
              value="8"
              icon={CheckCircle2}
              color="#4CAF50"
            />
            <MetricCard
              title="Productos disponibles"
              value="156"
              icon={Package}
              color="#F6A016"
            />
            <MetricCard
              title="Ingresos del día"
              value="$4,250"
              icon={DollarSign}
              color="#9F2743"
            />
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
};
