import React, { useState } from 'react';
import { ScreenContainer } from '../components/ScreenContainer';
import type {NavScreen} from '../components/BottomNav';
import { Search, MapPin, Phone, Plus } from 'lucide-react';
import { CreateClientModal, type NewClientData } from '../components/CreateClientModal';
import { ClientDetailModal, type ClientData } from '../components/ClientDetailModal';

interface ClientsScreenProps {
  onNavigate: (screen: NavScreen | 'profile') => void;
}

export const ClientsScreen: React.FC<ClientsScreenProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<ClientData | null>(null);
  const [clients, setClients] = useState<ClientData[]>([
    { id: 1, name: 'Abarrotes La Esquina', address: 'Av. Principal 123', phone: '555-0101', email: 'esquina@email.com', route: 'Ruta 1', status: 'pending' },
    { id: 2, name: 'Supermercado El Ahorro', address: 'Calle 5 de Mayo 456', phone: '555-0102', email: 'ahorro@email.com', route: 'Ruta 2', status: 'visited' },
    { id: 3, name: 'Tienda Doña María', address: 'Colonia Centro 789', phone: '555-0103', email: 'maria@email.com', route: 'Ruta 1', status: 'pending' },
    { id: 4, name: 'Minisuper Los Ángeles', address: 'Av. Revolución 321', phone: '555-0104', email: 'angeles@email.com', route: 'Ruta 3', status: 'visited' },
  ]);

  const filteredClients = clients.filter(client =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveClient = (newClient: NewClientData) => {
    const client: ClientData = {
      id: clients.length + 1,
      name: newClient.name,
      phone: newClient.phone,
      email: newClient.email,
      address: newClient.address,
      route: newClient.route,
      status: 'pending'
    };
    setClients([...clients, client]);
    setIsCreateModalOpen(false);
  };

  const handleViewDetails = (client: ClientData) => {
    setSelectedClient(client);
    setIsDetailModalOpen(true);
  };

  return (
      <ScreenContainer
          title="Clientes"
          activeScreen="clients"
          onNavigate={onNavigate}
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
                      onClick={() => handleViewDetails(client)}
                      className="bg-white rounded-2xl shadow-md p-4 cursor-pointer transition-transform active:scale-[0.98]"
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
                        <button
                            onClick={(e) => {
                              e.stopPropagation(); // evita abrir el modal
                                window.location.href = `tel:${client.phone}`;
                            }}
                            className="inline-flex items-center gap-2
                                       px-3 py-1.5
                                       rounded-full
                                       bg-[var(--color-primary)]/10
                                       text-[var(--color-primary)]
                                       text-sm font-semibold
                                       transition
                                       active:scale-95
                                       mt-2.5"
                        >
                          <Phone className="w-4 h-4" />
                          <span>{client.phone}</span>
                        </button>

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

                  </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Action Button (FAB) */}
        <button
            onClick={() => setIsCreateModalOpen(true)}
            className="fixed bottom-24 right-6 w-14 h-14 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-200 active:scale-90 z-40"
            aria-label="Nuevo cliente"
        >
          <Plus className="w-6 h-6" />
        </button>

        {/* Modales */}
        <CreateClientModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onSave={handleSaveClient}
        />

        <ClientDetailModal
            isOpen={isDetailModalOpen}
            onClose={() => setIsDetailModalOpen(false)}
            client={selectedClient}
        />
      </ScreenContainer>
  );
};
