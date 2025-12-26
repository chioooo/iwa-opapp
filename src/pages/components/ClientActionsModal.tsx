import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Textarea } from './ui/textarea';
import { ShoppingCart, CreditCard, Truck, Plus, Trash2, StickyNote, User } from 'lucide-react';
import type { Client, ClientNote } from './ClientDetailModal';

interface ClientActionsModalProps {
  client: Client | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveNotes: (client: Client) => void;
  onAction: (action: 'order' | 'collect' | 'deliver' | 'details', client: Client) => void;
}

export const ClientActionsModal: React.FC<ClientActionsModalProps> = ({
  client,
  isOpen,
  onClose,
  onSaveNotes,
  onAction,
}) => {
  const [showNotes, setShowNotes] = useState(false);
  const [editedClient, setEditedClient] = useState<Client | null>(null);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    if (client) {
      setEditedClient({ ...client, notes: client.notes || [] });
      setShowNotes(false);
      setNewNote('');
    }
  }, [client]);

  if (!client || !editedClient) return null;

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    const note: ClientNote = {
      id: Date.now(),
      text: newNote.trim(),
      date: new Date().toLocaleDateString('es-MX', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    const updatedClient = {
      ...editedClient,
      notes: [...(editedClient.notes || []), note],
    };
    setEditedClient(updatedClient);
    onSaveNotes(updatedClient);
    setNewNote('');
  };

  const handleDeleteNote = (noteId: number) => {
    const updatedClient = {
      ...editedClient,
      notes: (editedClient.notes || []).filter((n) => n.id !== noteId),
    };
    setEditedClient(updatedClient);
    onSaveNotes(updatedClient);
  };

  const handleAction = (action: 'order' | 'collect' | 'deliver' | 'details') => {
    onAction(action, client);
  };

  const actions = [
    {
      id: 'details' as const,
      label: 'Ver Detalles',
      icon: User,
      color: 'bg-[var(--color-primary)] hover:opacity-90',
      description: 'Ver y editar información del cliente',
    },
    {
      id: 'order' as const,
      label: 'Realizar Pedido',
      icon: ShoppingCart,
      color: 'bg-blue-500 hover:bg-blue-600',
      description: 'Crear un nuevo pedido para este cliente',
    },
    {
      id: 'collect' as const,
      label: 'Cobrar',
      icon: CreditCard,
      color: 'bg-green-500 hover:bg-green-600',
      description: 'Registrar un cobro o pago',
    },
    {
      id: 'deliver' as const,
      label: 'Realizar Entrega',
      icon: Truck,
      color: 'bg-purple-500 hover:bg-purple-600',
      description: 'Registrar una entrega de productos',
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open: boolean) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl text-gray-800">
            Acciones - {client.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {!showNotes ? (
            <>
              {/* Botones de acciones */}
              <div className="space-y-3">
                {actions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => handleAction(action.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl text-white transition-all active:scale-[0.98] ${action.color}`}
                  >
                    <div className="p-2 bg-white/20 rounded-lg">
                      <action.icon className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold">{action.label}</p>
                      <p className="text-sm opacity-80">{action.description}</p>
                    </div>
                  </button>
                ))}

                {/* Botón de notas */}
                <button
                  onClick={() => setShowNotes(true)}
                  className="w-full flex items-center gap-4 p-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white transition-all active:scale-[0.98]"
                >
                  <div className="p-2 bg-white/20 rounded-lg">
                    <StickyNote className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">Agregar Nota</p>
                    <p className="text-sm opacity-80">
                      {editedClient.notes?.length || 0} nota(s) existente(s)
                    </p>
                  </div>
                </button>
              </div>

              {/* Botón cerrar */}
              <button
                onClick={onClose}
                className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
              >
                Cerrar
              </button>
            </>
          ) : (
            <>
              {/* Sección de notas */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-800">Notas del Cliente</h3>
                  <button
                    onClick={() => setShowNotes(false)}
                    className="text-sm text-[var(--color-primary)] font-medium"
                  >
                    ← Volver
                  </button>
                </div>

                {/* Lista de notas existentes */}
                <div className="space-y-2 mb-3 max-h-48 overflow-y-auto">
                  {editedClient.notes && editedClient.notes.length > 0 ? (
                    editedClient.notes.map((note) => (
                      <div
                        key={note.id}
                        className="bg-gray-50 rounded-lg p-3 relative group"
                      >
                        <p className="text-sm text-gray-700 pr-8">{note.text}</p>
                        <p className="text-xs text-gray-400 mt-1">{note.date}</p>
                        <button
                          type="button"
                          onClick={() => handleDeleteNote(note.id)}
                          className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400 italic py-4 text-center">
                      No hay notas aún
                    </p>
                  )}
                </div>

                {/* Agregar nueva nota */}
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Agregar una nota..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="flex-1 min-h-[80px] text-sm"
                  />
                  <button
                    type="button"
                    onClick={handleAddNote}
                    disabled={!newNote.trim()}
                    className="self-end px-3 py-2 bg-[var(--color-primary)] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
