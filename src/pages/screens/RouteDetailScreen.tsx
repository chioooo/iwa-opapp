import React, { useState } from 'react';
import { ArrowLeft, MapPin, Phone, MessageCircle, MessageSquare, FileText, Clock, CheckCircle, XCircle, User, History, Trash2, AlertCircle } from 'lucide-react';

interface LogEntry {
  id: number;
  date: string;
  text: string;
}

interface Client {
  id: number;
  name: string;
  address: string;
  phone: string;
  status: 'pending' | 'visited' | 'not_found';
  notes?: string;
  log: LogEntry[];
}

interface Route {
  id: number;
  name: string;
  clients: number;
  completed: number;
  estimatedTime: string;
}

interface RouteDetailScreenProps {
  route: Route;
  onBack: () => void;
}

export const RouteDetailScreen: React.FC<RouteDetailScreenProps> = ({ route, onBack }) => {
  const [clients, setClients] = useState<Client[]>([
    { id: 1, name: 'Abarrotes La Esquina', address: 'Av. Principal 123, Col. Centro, CDMX', phone: '5551234567', status: 'visited', log: [{ id: 1, date: '20/12/2024 10:30', text: 'Cliente visitado, pedido realizado' }] },
    { id: 2, name: 'Supermercado El Ahorro', address: 'Calle 5 de Mayo 456, Col. Juárez, CDMX', phone: '5552345678', status: 'pending', log: [] },
    { id: 3, name: 'Tienda Doña María', address: 'Colonia Centro 789, Delegación Cuauhtémoc', phone: '5553456789', status: 'not_found', notes: 'Local cerrado, regresaré mañana', log: [{ id: 1, date: '19/12/2024 14:00', text: 'Local cerrado' }, { id: 2, date: '20/12/2024 11:00', text: 'Intenté de nuevo, sigue cerrado' }] },
    { id: 4, name: 'Minisuper Los Ángeles', address: 'Av. Revolución 321, Col. Mixcoac, CDMX', phone: '5554567890', status: 'pending', log: [] },
    { id: 5, name: 'Cremería El Buen Sabor', address: 'Calle Hidalgo 555, Col. Del Valle', phone: '5555678901', status: 'visited', log: [{ id: 1, date: '20/12/2024 09:15', text: 'Visita exitosa' }] },
    { id: 6, name: 'Frutería La Abundancia', address: 'Av. Juárez 888, Col. Roma Norte, CDMX', phone: '5556789012', status: 'pending', log: [] },
  ]);

  const [showNotesModal, setShowNotesModal] = useState(false);
  const [showLogModal, setShowLogModal] = useState(false);
  const [showConfirmVisitModal, setShowConfirmVisitModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showConfirmStatusModal, setShowConfirmStatusModal] = useState(false);
  const [clientToMarkVisited, setClientToMarkVisited] = useState<number | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<Client['status'] | null>(null);
  const [noteText, setNoteText] = useState('');
  const [logText, setLogText] = useState('');

  // Simulated logged-in user (in real app, this would come from auth context)
  const currentUser = 'Carlos Rodríguez';

  const handleCall = (phone: string) => {
    const link = document.createElement('a');
    link.href = `tel:${phone}`;
    link.click();
  };

  const handleWhatsApp = (phone: string) => {
    window.open(`https://wa.me/52${phone}`, '_blank');
  };

  const handleSMS = (phone: string) => {
    const link = document.createElement('a');
    link.href = `sms:${phone}`;
    link.click();
  };

  const openNotesModal = (client: Client) => {
    setSelectedClient(client);
    setNoteText(client.notes || '');
    setShowNotesModal(true);
  };

  const saveNote = () => {
    if (selectedClient) {
      setClients(prev => prev.map(c => 
        c.id === selectedClient.id 
          ? { ...c, notes: noteText, status: noteText ? 'not_found' : c.status }
          : c
      ));
      setShowNotesModal(false);
      setSelectedClient(null);
      setNoteText('');
    }
  };

  const openConfirmVisitModal = (clientId: number) => {
    setClientToMarkVisited(clientId);
    setShowConfirmVisitModal(true);
  };

  const confirmMarkAsVisited = () => {
    if (clientToMarkVisited) {
      const now = new Date();
      const dateStr = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      setClients(prev => prev.map(c => 
        c.id === clientToMarkVisited 
          ? { 
              ...c, 
              status: 'visited',
              log: [...c.log, { id: Date.now(), date: dateStr, text: 'Marcado como visitado' }]
            } 
          : c
      ));
      setShowConfirmVisitModal(false);
      setClientToMarkVisited(null);
    }
  };

  const openLogModal = (client: Client) => {
    setSelectedClient(client);
    setLogText('');
    setShowLogModal(true);
  };

  const addLogEntry = () => {
    if (selectedClient && logText.trim()) {
      const now = new Date();
      const dateStr = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      setClients(prev => prev.map(c => 
        c.id === selectedClient.id 
          ? { ...c, log: [...c.log, { id: Date.now(), date: dateStr, text: logText.trim() }] }
          : c
      ));
      setLogText('');
    }
  };

  const deleteLogEntry = (clientId: number, logId: number) => {
    setClients(prev => prev.map(c => 
      c.id === clientId 
        ? { ...c, log: c.log.filter(entry => entry.id !== logId) }
        : c
    ));
  };

  const handleOpenMaps = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  const openStatusModal = (client: Client) => {
    setSelectedClient(client);
    setSelectedStatus(null);
    setShowStatusModal(true);
  };

  const selectStatus = (status: Client['status']) => {
    setSelectedStatus(status);
    setShowStatusModal(false);
    setShowConfirmStatusModal(true);
  };

  const confirmStatusChange = () => {
    if (selectedClient && selectedStatus) {
      const now = new Date();
      const dateStr = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      const statusLabels: Record<Client['status'], string> = {
        'pending': 'Pendiente',
        'visited': 'Visitado',
        'not_found': 'No encontrado'
      };
      
      const oldStatus = statusLabels[selectedClient.status];
      const newStatus = statusLabels[selectedStatus];
      
      setClients(prev => prev.map(c => 
        c.id === selectedClient.id 
          ? { 
              ...c, 
              status: selectedStatus,
              log: [...c.log, { 
                id: Date.now(), 
                date: dateStr, 
                text: `Estado cambiado de "${oldStatus}" a "${newStatus}" por ${currentUser}` 
              }]
            } 
          : c
      ));
      
      setShowConfirmStatusModal(false);
      setSelectedClient(null);
      setSelectedStatus(null);
    }
  };

  const getStatusLabel = (status: Client['status']) => {
    switch (status) {
      case 'visited': return 'Visitado';
      case 'not_found': return 'No encontrado';
      default: return 'Pendiente';
    }
  };

  const getStatusBadge = (status: Client['status']) => {
    switch (status) {
      case 'visited':
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
            <CheckCircle className="w-3 h-3" />
            Visitado
          </span>
        );
      case 'not_found':
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">
            <XCircle className="w-3 h-3" />
            No encontrado
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold">
            <Clock className="w-3 h-3" />
            Pendiente
          </span>
        );
    }
  };

  const visitedCount = clients.filter(c => c.status === 'visited').length;
  const progress = (visitedCount / clients.length) * 100;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="flex items-center gap-3 px-4 py-4">
          <button 
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 transition-transform active:scale-95"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-gray-800">{route.name}</h1>
            <p className="text-sm text-gray-500">{visitedCount}/{clients.length} clientes visitados</p>
          </div>
        </div>
        
        {/* Barra de progreso */}
        <div className="px-4 pb-3">
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="pt-[100px] pb-6 px-4">
        <div className="max-w-[390px] mx-auto space-y-4">
          {clients.map((client) => (
            <div
              key={client.id}
              className="bg-white rounded-2xl shadow-md p-4"
            >
              {/* Client Info */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-10 h-10 bg-[#D0323A15] rounded-xl flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-[var(--color-primary)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-gray-800 font-semibold text-base truncate">
                      {client.name}
                    </h3>
                    <button
                      onClick={() => handleOpenMaps(client.address)}
                      className="flex items-start gap-2 text-sm text-blue-600 mt-2 p-3 bg-blue-50 rounded-xl w-full text-left transition-transform active:scale-[0.98] min-h-[52px]"
                    >
                      <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{client.address}</span>
                    </button>
                    <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-2">
                      <Phone className="w-4 h-4 flex-shrink-0" />
                      <span>{client.phone}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => openStatusModal(client)}
                  className="transition-transform active:scale-95"
                >
                  {getStatusBadge(client.status)}
                </button>
              </div>

              {/* Notes if exists */}
              {client.notes && (
                <div className="mb-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <p className="text-sm text-orange-800">
                    <span className="font-semibold">Nota:</span> {client.notes}
                  </p>
                </div>
              )}

              {/* Log entries preview */}
              {client.log.length > 0 && (
                <div className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <History className="w-4 h-4 text-gray-500" />
                    <span className="text-xs font-semibold text-gray-600">Última actividad:</span>
                  </div>
                  <p className="text-sm text-gray-700">
                    <span className="text-xs text-gray-400">{client.log[client.log.length - 1].date}</span>
                    {' - '}{client.log[client.log.length - 1].text}
                  </p>
                  {client.log.length > 1 && (
                    <p className="text-xs text-gray-400 mt-1">+{client.log.length - 1} actividades anteriores</p>
                  )}
                </div>
              )}

              {/* Action Buttons - Row 1: Communication */}
              <div className="grid grid-cols-3 gap-2 mb-2">
                <button
                  onClick={() => handleCall(client.phone)}
                  className="flex flex-col items-center gap-1 p-3 bg-blue-50 rounded-xl transition-transform active:scale-95"
                >
                  <Phone className="w-5 h-5 text-blue-600" />
                  <span className="text-xs text-blue-600 font-medium">Llamar</span>
                </button>
                
                <button
                  onClick={() => handleWhatsApp(client.phone)}
                  className="flex flex-col items-center gap-1 p-3 bg-green-50 rounded-xl transition-transform active:scale-95"
                >
                  <MessageCircle className="w-5 h-5 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">WhatsApp</span>
                </button>
                
                <button
                  onClick={() => handleSMS(client.phone)}
                  className="flex flex-col items-center gap-1 p-3 bg-purple-50 rounded-xl transition-transform active:scale-95"
                >
                  <MessageSquare className="w-5 h-5 text-purple-600" />
                  <span className="text-xs text-purple-600 font-medium">SMS</span>
                </button>
              </div>

              {/* Action Buttons - Row 2: Notes & Log */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                <button
                  onClick={() => openNotesModal(client)}
                  className="flex items-center justify-center gap-2 p-3 bg-orange-50 rounded-xl transition-transform active:scale-95"
                >
                  <FileText className="w-5 h-5 text-orange-600" />
                  <span className="text-sm text-orange-600 font-medium">Notas</span>
                </button>
                
                <button
                  onClick={() => openLogModal(client)}
                  className="flex items-center justify-center gap-2 p-3 bg-indigo-50 rounded-xl transition-transform active:scale-95 relative"
                >
                  <History className="w-5 h-5 text-indigo-600" />
                  <span className="text-sm text-indigo-600 font-medium">Bitácora</span>
                  {client.log.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-600 text-white text-xs rounded-full flex items-center justify-center">
                      {client.log.length}
                    </span>
                  )}
                </button>
              </div>

              {/* Mark as visited button */}
              {client.status !== 'visited' && (
                <button
                  onClick={() => openConfirmVisitModal(client.id)}
                  className="w-full bg-[var(--color-primary)] text-white py-3.5 rounded-xl text-sm font-semibold transition-transform active:scale-[0.98]"
                >
                  Marcar como visitado
                </button>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Notes Modal */}
      {showNotesModal && selectedClient && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
          <div className="bg-white w-full max-w-[390px] rounded-t-3xl sm:rounded-3xl p-6 animate-slide-up">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Agregar nota
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              {selectedClient.name}
            </p>
            
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Ej: No se encontró al cliente, local cerrado..."
              className="w-full h-32 p-4 border border-gray-300 rounded-xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent resize-none"
            />

            {/* Quick options */}
            <div className="flex flex-wrap gap-2 mt-3 mb-4">
              {['No se encontró', 'Local cerrado', 'Regresaré mañana', 'Sin stock'].map((option) => (
                <button
                  key={option}
                  onClick={() => setNoteText(option)}
                  className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm transition-colors hover:bg-gray-200"
                >
                  {option}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowNotesModal(false);
                  setSelectedClient(null);
                  setNoteText('');
                }}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold transition-transform active:scale-[0.98]"
              >
                Cancelar
              </button>
              <button
                onClick={saveNote}
                className="flex-1 py-3 bg-[var(--color-primary)] text-white rounded-xl font-semibold transition-transform active:scale-[0.98]"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Log/Bitácora Modal */}
      {showLogModal && selectedClient && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
          <div className="bg-white w-full max-w-[390px] rounded-t-3xl sm:rounded-3xl p-6 animate-slide-up max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  Bitácora
                </h3>
                <p className="text-sm text-gray-500">
                  {selectedClient.name}
                </p>
              </div>
              <button
                onClick={() => {
                  setShowLogModal(false);
                  setSelectedClient(null);
                  setLogText('');
                }}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100"
              >
                <XCircle className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Add new entry */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={logText}
                onChange={(e) => setLogText(e.target.value)}
                placeholder="Agregar actividad..."
                className="flex-1 h-12 px-4 border border-gray-300 rounded-xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                onKeyDown={(e) => e.key === 'Enter' && addLogEntry()}
              />
              <button
                onClick={addLogEntry}
                disabled={!logText.trim()}
                className="px-4 h-12 bg-indigo-600 text-white rounded-xl font-semibold transition-transform active:scale-95 disabled:opacity-50 disabled:active:scale-100"
              >
                Agregar
              </button>
            </div>

            {/* Log entries list */}
            <div className="flex-1 overflow-y-auto space-y-2">
              {clients.find(c => c.id === selectedClient.id)?.log.slice().reverse().map((entry) => (
                <div key={entry.id} className="flex items-start justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex-1">
                    <p className="text-xs text-gray-400 mb-1">{entry.date}</p>
                    <p className="text-sm text-gray-700">{entry.text}</p>
                  </div>
                  <button
                    onClick={() => deleteLogEntry(selectedClient.id, entry.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              
              {clients.find(c => c.id === selectedClient.id)?.log.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <History className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No hay actividades en la bitácora</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Confirm Visit Modal */}
      {showConfirmVisitModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-[340px] rounded-3xl p-6 animate-slide-up">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-[#D0323A15] rounded-full flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-[var(--color-primary)]" />
              </div>
            </div>
            
            <h3 className="text-lg font-bold text-gray-800 text-center mb-2">
              ¿Marcar como visitado?
            </h3>
            <p className="text-sm text-gray-500 text-center mb-6">
              Esta acción confirmará que has visitado al cliente. ¿Estás seguro?
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowConfirmVisitModal(false);
                  setClientToMarkVisited(null);
                }}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold transition-transform active:scale-[0.98]"
              >
                Cancelar
              </button>
              <button
                onClick={confirmMarkAsVisited}
                className="flex-1 py-3 bg-[var(--color-primary)] text-white rounded-xl font-semibold transition-transform active:scale-[0.98]"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Status Selector Modal */}
      {showStatusModal && selectedClient && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
          <div className="bg-white w-full max-w-[390px] rounded-t-3xl sm:rounded-3xl p-6 animate-slide-up">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Cambiar estado
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              {selectedClient.name}
            </p>
            
            <div className="space-y-2 mb-4">
              <button
                onClick={() => selectStatus('pending')}
                className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                  selectedClient.status === 'pending' 
                    ? 'border-gray-400 bg-gray-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-gray-800">Pendiente</p>
                  <p className="text-xs text-gray-500">Cliente aún no visitado</p>
                </div>
                {selectedClient.status === 'pending' && (
                  <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">Actual</span>
                )}
              </button>

              <button
                onClick={() => selectStatus('visited')}
                className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                  selectedClient.status === 'visited' 
                    ? 'border-green-400 bg-green-50' 
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-gray-800">Visitado</p>
                  <p className="text-xs text-gray-500">Cliente visitado exitosamente</p>
                </div>
                {selectedClient.status === 'visited' && (
                  <span className="text-xs bg-green-200 text-green-700 px-2 py-1 rounded-full">Actual</span>
                )}
              </button>

              <button
                onClick={() => selectStatus('not_found')}
                className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                  selectedClient.status === 'not_found' 
                    ? 'border-orange-400 bg-orange-50' 
                    : 'border-gray-200 hover:border-orange-300'
                }`}
              >
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-orange-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-gray-800">No encontrado</p>
                  <p className="text-xs text-gray-500">No se pudo localizar al cliente</p>
                </div>
                {selectedClient.status === 'not_found' && (
                  <span className="text-xs bg-orange-200 text-orange-700 px-2 py-1 rounded-full">Actual</span>
                )}
              </button>
            </div>

            <button
              onClick={() => {
                setShowStatusModal(false);
                setSelectedClient(null);
              }}
              className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold transition-transform active:scale-[0.98]"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Confirm Status Change Modal */}
      {showConfirmStatusModal && selectedClient && selectedStatus && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-[340px] rounded-3xl p-6 animate-slide-up">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-[#D0323A15] rounded-full flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-[var(--color-primary)]" />
              </div>
            </div>
            
            <h3 className="text-lg font-bold text-gray-800 text-center mb-2">
              ¿Confirmar cambio de estado?
            </h3>
            <p className="text-sm text-gray-500 text-center mb-2">
              Cambiarás el estado de:
            </p>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
                {getStatusLabel(selectedClient.status)}
              </span>
              <span className="text-gray-400">→</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                selectedStatus === 'visited' ? 'bg-green-100 text-green-700' :
                selectedStatus === 'not_found' ? 'bg-orange-100 text-orange-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {getStatusLabel(selectedStatus)}
              </span>
            </div>
            <p className="text-xs text-gray-400 text-center mb-6">
              Este cambio quedará registrado en la bitácora.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowConfirmStatusModal(false);
                  setSelectedClient(null);
                  setSelectedStatus(null);
                }}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold transition-transform active:scale-[0.98]"
              >
                Cancelar
              </button>
              <button
                onClick={confirmStatusChange}
                className="flex-1 py-3 bg-[var(--color-primary)] text-white rounded-xl font-semibold transition-transform active:scale-[0.98]"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
