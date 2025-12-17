import React from 'react';
import { ScreenContainer } from '../components/ScreenContainer';
import type { NavScreen} from '../components/BottomNav';
import { DollarSign, TrendingUp, Calendar, FileText } from 'lucide-react';

interface SalesScreenProps {
  onNavigate: (screen: NavScreen | 'profile') => void;
}

export const SalesScreen: React.FC<SalesScreenProps> = ({ onNavigate }) => {
  const recentSales = [
    { id: 1, client: 'Abarrotes La Esquina', amount: 1250.00, date: '16 Dic 2024', status: 'completed' },
    { id: 2, client: 'Supermercado El Ahorro', amount: 2800.50, date: '16 Dic 2024', status: 'completed' },
    { id: 3, client: 'Minisuper Los Ángeles', amount: 850.75, date: '15 Dic 2024', status: 'pending' },
  ];

  return (
    <ScreenContainer
      title="Ventas"
      activeScreen="sales"
      onNavigate={onNavigate}
      onProfileClick={() => onNavigate('profile')}
    >
      <div className="p-6">
        <div className="max-w-[390px] mx-auto">
          {/* Resumen del día */}
          <div className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] rounded-2xl shadow-lg p-6 mb-6 text-white">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-6 h-6" />
              <h2 style={{ fontSize: '16px', fontWeight: '600' }}>Resumen del día</h2>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span style={{ fontSize: '36px', fontWeight: '700' }}>$4,250</span>
              <span className="text-white/80 text-sm">MXN</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-white/90">
              <TrendingUp className="w-4 h-4" />
              <span>+15% vs ayer</span>
            </div>
          </div>

          {/* Métricas rápidas */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow-md p-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-[var(--color-tertiary)]" />
                <span className="text-sm text-gray-500">Ventas</span>
              </div>
              <p className="text-gray-800" style={{ fontSize: '24px', fontWeight: '700' }}>8</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-[var(--color-secondary)]" />
                <span className="text-sm text-gray-500">Esta semana</span>
              </div>
              <p className="text-gray-800" style={{ fontSize: '24px', fontWeight: '700' }}>$18,450</p>
            </div>
          </div>

          {/* Ventas recientes */}
          <div className="mb-4">
            <h3 className="text-gray-800 mb-4" style={{ fontSize: '18px', fontWeight: '600' }}>
              Ventas recientes
            </h3>
            <div className="space-y-3">
              {recentSales.map((sale) => (
                <div
                  key={sale.id}
                  className="bg-white rounded-xl shadow-md p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="text-gray-800 mb-1" style={{ fontSize: '15px', fontWeight: '600' }}>
                        {sale.client}
                      </h4>
                      <p className="text-sm text-gray-500">{sale.date}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        sale.status === 'completed' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                      style={{ fontWeight: '600' }}
                    >
                      {sale.status === 'completed' ? 'Completada' : 'Pendiente'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-gray-800" style={{ fontSize: '20px', fontWeight: '700' }}>
                      ${sale.amount.toFixed(2)}
                    </span>
                    <button className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg text-sm transition-transform active:scale-95" style={{ fontWeight: '600' }}>
                      Ver detalle
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botón nueva venta */}
          <button className="w-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white py-4 rounded-xl shadow-lg transition-transform active:scale-[0.98]" style={{ fontSize: '16px', fontWeight: '600' }}>
            + Nueva venta
          </button>
        </div>
      </div>
    </ScreenContainer>
  );
};
