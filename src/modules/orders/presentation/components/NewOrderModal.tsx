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
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center landscape:items-center justify-center">
      <div className="bg-white w-full max-w-md landscape:max-w-3xl max-h-[90vh] landscape:max-h-[95vh] rounded-t-2xl sm:rounded-2xl landscape:rounded-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-3 landscape:p-2 border-b border-gray-200">
          <h2 className="text-base landscape:text-sm font-semibold text-gray-800">Nuevo Pedido</h2>
          <button
            onClick={() => { handleReset(); onClose(); }}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 landscape:p-3 space-y-4 landscape:space-y-2 landscape:flex landscape:flex-row landscape:gap-4">
          {/* Panel izquierdo en landscape */}
          <div className="landscape:w-1/2 landscape:space-y-2 space-y-4">
            {error && (
              <div className="bg-red-50 text-red-700 px-3 py-2 rounded-lg text-xs">
                {error}
              </div>
            )}

            {/* Cliente */}
            <div>
              <label className="block text-xs landscape:text-xs font-medium text-gray-700 mb-1">
                Cliente
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
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
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                />
                {showClientList && filteredClients.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-32 overflow-y-auto z-10">
                    {filteredClients.map(client => (
                      <button
                        key={client.id}
                        onClick={() => handleSelectClient(client)}
                        className="w-full px-3 py-2 text-left hover:bg-gray-50 border-b border-gray-100 last:border-0"
                      >
                        <p className="font-medium text-gray-800 text-sm">{client.name}</p>
                        <p className="text-xs text-gray-500">{client.address}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Fecha de entrega */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                <Calendar className="inline w-3 h-3 mr-1" />
                Fecha de entrega
              </label>
              <input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
              />
            </div>

            {/* Notas */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Notas (opcional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Instrucciones especiales..."
                rows={1}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent resize-none"
              />
            </div>
          </div>

          {/* Panel derecho en landscape: Productos */}
          <div className="landscape:w-1/2 landscape:space-y-2 space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                <Package className="inline w-3 h-3 mr-1" />
                Productos
              </label>
              <div className="grid grid-cols-2 landscape:grid-cols-3 gap-2 mb-2">
                {DEMO_PRODUCTS.map(product => (
                  <button
                    key={product.id}
                    onClick={() => handleAddProduct(product)}
                    className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition-colors"
                  >
                    <p className="text-xs font-medium text-gray-800 truncate">{product.name}</p>
                    <p className="text-xs text-[var(--color-primary)] font-semibold">${product.price.toFixed(2)}</p>
                  </button>
                ))}
              </div>

              {/* Items seleccionados */}
              {items.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-2 space-y-1 max-h-24 landscape:max-h-20 overflow-y-auto">
                  {items.map(item => (
                    <div key={item.productId} className="flex items-center justify-between bg-white rounded-lg p-1.5">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-800 truncate">{item.productName}</p>
                        <p className="text-[10px] text-gray-500">${item.unitPrice.toFixed(2)} c/u</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleUpdateQuantity(item.productId, -1)}
                          className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.productId, 1)}
                          className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleRemoveItem(item.productId)}
                          className="w-6 h-6 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-full"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 landscape:p-2 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between landscape:gap-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-600 text-sm">Total:</span>
              <span className="text-xl landscape:text-lg font-bold text-gray-800">${total.toFixed(2)}</span>
            </div>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="landscape:flex-1 landscape:max-w-xs bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white py-3 landscape:py-2 px-6 rounded-xl font-semibold text-sm transition-transform active:scale-[0.98] disabled:opacity-50"
            >
              {submitting ? 'Creando...' : 'Crear Pedido'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
