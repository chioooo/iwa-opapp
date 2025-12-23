import React, { useState } from 'react';
import { X, Plus, Minus, Search, Calendar, Package } from 'lucide-react';
import type { Client, CreateOrderDTO, OrderItem } from '../../domain/entities';

interface NewOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (order: CreateOrderDTO) => Promise<unknown>;
  clients: Client[];
}

const DEMO_PRODUCTS = [
  { id: 'prod_1', name: 'Coca-Cola 600ml', price: 18.00 },
  { id: 'prod_2', name: 'Sabritas Original', price: 22.50 },
  { id: 'prod_3', name: 'Bimbo Pan Blanco', price: 45.00 },
  { id: 'prod_4', name: 'Leche Lala 1L', price: 28.00 },
  { id: 'prod_5', name: 'Agua Ciel 1L', price: 12.00 },
  { id: 'prod_6', name: 'Galletas Marías', price: 15.50 },
];

export const NewOrderModal: React.FC<NewOrderModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  clients,
}) => {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [clientSearch, setClientSearch] = useState('');
  const [showClientList, setShowClientList] = useState(false);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [scheduledDate, setScheduledDate] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filteredClients = clients.filter(c =>
    c.name.toLowerCase().includes(clientSearch.toLowerCase())
  );

  const handleSelectClient = (client: Client) => {
    setSelectedClient(client);
    setClientSearch(client.name);
    setShowClientList(false);
  };

  const handleAddProduct = (product: typeof DEMO_PRODUCTS[0]) => {
    const existingIndex = items.findIndex(i => i.productId === product.id);
    if (existingIndex >= 0) {
      const newItems = [...items];
      newItems[existingIndex].quantity += 1;
      setItems(newItems);
    } else {
      setItems([...items, {
        productId: product.id,
        productName: product.name,
        quantity: 1,
        unitPrice: product.price,
      }]);
    }
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    const newItems = items.map(item => {
      if (item.productId === productId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }).filter(item => item.quantity > 0);
    setItems(newItems);
  };

  const handleRemoveItem = (productId: string) => {
    setItems(items.filter(i => i.productId !== productId));
  };

  const total = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

  const handleSubmit = async () => {
    setError(null);
    
    if (!selectedClient) {
      setError('Selecciona un cliente');
      return;
    }
    if (items.length === 0) {
      setError('Agrega al menos un producto');
      return;
    }
    if (!scheduledDate) {
      setError('Selecciona una fecha de entrega');
      return;
    }

    try {
      setSubmitting(true);
      await onSubmit({
        clientId: selectedClient.id,
        clientName: selectedClient.name,
        items,
        scheduledDate,
        notes,
      });
      handleReset();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear pedido');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSelectedClient(null);
    setClientSearch('');
    setItems([]);
    setScheduledDate('');
    setNotes('');
    setError(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white w-full max-w-md max-h-[90vh] rounded-t-2xl sm:rounded-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Nuevo Pedido</h2>
          <button
            onClick={() => { handleReset(); onClose(); }}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {error && (
            <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Cliente */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cliente
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={clientSearch}
                onChange={(e) => {
                  setClientSearch(e.target.value);
                  setShowClientList(true);
                  if (selectedClient && e.target.value !== selectedClient.name) {
                    setSelectedClient(null);
                  }
                }}
                onFocus={() => setShowClientList(true)}
                placeholder="Buscar cliente..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
              />
              {showClientList && filteredClients.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-40 overflow-y-auto z-10">
                  {filteredClients.map(client => (
                    <button
                      key={client.id}
                      onClick={() => handleSelectClient(client)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-0"
                    >
                      <p className="font-medium text-gray-800">{client.name}</p>
                      <p className="text-sm text-gray-500">{client.address}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Fecha de entrega */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline w-4 h-4 mr-1" />
              Fecha de entrega
            </label>
            <input
              type="date"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
            />
          </div>

          {/* Productos */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Package className="inline w-4 h-4 mr-1" />
              Productos
            </label>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {DEMO_PRODUCTS.map(product => (
                <button
                  key={product.id}
                  onClick={() => handleAddProduct(product)}
                  className="p-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-left transition-colors"
                >
                  <p className="text-sm font-medium text-gray-800 truncate">{product.name}</p>
                  <p className="text-sm text-[var(--color-primary)] font-semibold">${product.price.toFixed(2)}</p>
                </button>
              ))}
            </div>

            {/* Items seleccionados */}
            {items.length > 0 && (
              <div className="bg-gray-50 rounded-xl p-3 space-y-2">
                {items.map(item => (
                  <div key={item.productId} className="flex items-center justify-between bg-white rounded-lg p-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{item.productName}</p>
                      <p className="text-xs text-gray-500">${item.unitPrice.toFixed(2)} c/u</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpdateQuantity(item.productId, -1)}
                        className="w-7 h-7 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.productId, 1)}
                        className="w-7 h-7 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleRemoveItem(item.productId)}
                        className="w-7 h-7 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-full"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Notas */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notas (opcional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Instrucciones especiales..."
              rows={2}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600">Total:</span>
            <span className="text-2xl font-bold text-gray-800">${total.toFixed(2)}</span>
          </div>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white py-4 rounded-xl font-semibold transition-transform active:scale-[0.98] disabled:opacity-50"
          >
            {submitting ? 'Creando...' : 'Crear Pedido'}
          </button>
        </div>
      </div>
    </div>
  );
};
