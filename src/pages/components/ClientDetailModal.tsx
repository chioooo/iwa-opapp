import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';
import { MapPin, Phone, Save, Edit3, X } from 'lucide-react';

export interface ClientNote {
  id: number;
  text: string;
  date: string;
}

export type ClientStatus = 'pending' | 'active' | 'inactive' | 'vip';

export interface Client {
  id: number;
  name: string;
  address: string;
  phone: string;
  status: ClientStatus;
  notes?: ClientNote[];
}

interface ClientDetailModalProps {
  client: Client | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (client: Client) => void;
}

export const ClientDetailModal: React.FC<ClientDetailModalProps> = ({
  client,
  isOpen,
  onClose,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedClient, setEditedClient] = useState<Client | null>(null);

  useEffect(() => {
    if (client) {
      setEditedClient({ ...client, notes: client.notes || [] });
      setIsEditing(false);
    }
  }, [client]);

  if (!client || !editedClient) return null;

  const handleInputChange = (field: keyof Client, value: string) => {
    setEditedClient((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleStatusChange = (status: ClientStatus) => {
    setEditedClient((prev) => (prev ? { ...prev, status } : null));
  };

  const getStatusConfig = (status: ClientStatus) => {
    const configs = {
      pending: { label: 'Pendiente', bgActive: 'bg-orange-500', bgBadge: 'bg-orange-100 text-orange-700' },
      active: { label: 'Activo', bgActive: 'bg-green-500', bgBadge: 'bg-green-100 text-green-700' },
      inactive: { label: 'Inactivo', bgActive: 'bg-gray-500', bgBadge: 'bg-gray-200 text-gray-600' },
      vip: { label: 'VIP', bgActive: 'bg-purple-500', bgBadge: 'bg-purple-100 text-purple-700' },
    };
    return configs[status];
  };

  const handleSave = () => {
    if (editedClient) {
      onSave(editedClient);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedClient({ ...client, notes: client.notes || [] });
    setIsEditing(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open: boolean) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl text-gray-800">
            {isEditing ? 'Editar Cliente' : 'Detalles del Cliente'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Información del cliente */}
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-600">Nombre</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedClient.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                />
              ) : (
                <p className="text-gray-800 font-semibold text-lg">{editedClient.name}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                <MapPin className="w-4 h-4" /> Dirección
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedClient.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                />
              ) : (
                <p className="text-gray-700">{editedClient.address}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                <Phone className="w-4 h-4" /> Teléfono
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={editedClient.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                />
              ) : (
                <p className="text-gray-700">{editedClient.phone}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Estado</label>
              {isEditing ? (
                <div className="flex flex-wrap gap-2 mt-1">
                  {(['pending', 'active', 'inactive', 'vip'] as ClientStatus[]).map((status) => {
                    const config = getStatusConfig(status);
                    return (
                      <button
                        key={status}
                        type="button"
                        onClick={() => handleStatusChange(status)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          editedClient.status === status
                            ? `${config.bgActive} text-white`
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {config.label}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <span
                  className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusConfig(editedClient.status).bgBadge}`}
                >
                  {getStatusConfig(editedClient.status).label}
                </span>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                <X className="w-4 h-4" />
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
              >
                <Save className="w-4 h-4" />
                Guardar
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Cerrar
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
              >
                <Edit3 className="w-4 h-4" />
                Editar
              </button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
