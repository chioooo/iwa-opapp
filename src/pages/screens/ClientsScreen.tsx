import React, { useState } from 'react';
import { ScreenContainer } from '../components/ScreenContainer';
import type {NavScreen} from '../components/BottomNav';
import { Search, MapPin, Phone } from 'lucide-react';

interface ClientsScreenProps {
  onNavigate: (screen: NavScreen | 'profile') => void;
}

export const ClientsScreen: React.FC<ClientsScreenProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const clients = [
    { id: 1, name: 'Abarrotes La Esquina', address: 'Av. Principal 123', phone: '555-0101', status: 'pending' },
    { id: 2, name: 'Supermercado El Ahorro', address: 'Calle 5 de Mayo 456', phone: '555-0102', status: 'visited' },
    { id: 3, name: 'Tienda Doña María', address: 'Colonia Centro 789', phone: '555-0103', status: 'pending' },
    { id: 4, name: 'Minisuper Los Ángeles', address: 'Av. Revolución 321', phone: '555-0104', status: 'visited' },
  ];

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScreenContainer
      title="Clientes"
      activeScreen="clients"
      onNavigate={onNavigate}
      onProfileClick={() => onNavigate('profile')}
    >
      <div className="p-6">
        <div className="max-w-[390px] sm:max-w-full mx-auto">
          {/* Búsqueda */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar cliente..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
              />
            </div>
          </div>

          {/* Lista de clientes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {filteredClients.map((client) => (
              <div
                key={client.id}
                className="bg-white rounded-2xl shadow-md p-4 transition-transform active:scale-[0.98]"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-gray-800 mb-1" style={{ fontSize: '16px', fontWeight: '600' }}>
                      {client.name}
                    </h3>
                    <div className="flex items-start gap-2 text-sm text-gray-500 mb-1">
                      <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>{client.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Phone className="w-4 h-4" />
                      <span>{client.phone}</span>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      client.status === 'visited' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-orange-100 text-orange-700'
                    }`}
                    style={{ fontWeight: '600' }}
                  >
                    {client.status === 'visited' ? 'Visitado' : 'Pendiente'}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 bg-[var(--color-primary)] text-white py-2 rounded-lg text-sm transition-transform active:scale-95" style={{ fontWeight: '600' }}>
                    Ver detalles
                  </button>
                  <button className="px-4 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm transition-transform active:scale-95" style={{ fontWeight: '600' }}>
                    Llamar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
};
