import React from 'react';
import { X, MapPin, Phone, Mail, Route } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ClientDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    client: ClientData | null;
}

export interface ClientData {
    id: number;
    name: string;
    phone: string;
    email?: string;
    address: string;
    route?: string;
    status?: 'pending' | 'visited';
}

export const ClientDetailModal: React.FC<ClientDetailModalProps> = ({
                                                                        isOpen,
                                                                        onClose,
                                                                        client,
                                                                    }) => {
    if (!client) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        onClick={(e) => e.target === e.currentTarget && onClose()}
                    >
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[390px] max-h-[90vh] flex flex-col">
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-200">
                                <h2 className="text-gray-800" style={{ fontSize: '20px', fontWeight: '700' }}>
                                    Información del cliente
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors active:scale-95"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="flex-1 overflow-y-auto px-6 py-6">
                                <div className="space-y-6">
                                    {/* Datos generales */}
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <h3 className="text-gray-700 mb-3" style={{ fontSize: '14px', fontWeight: '700' }}>
                                            Datos generales
                                        </h3>
                                        <div className="space-y-2">
                                            <div>
                                                <p className="text-gray-500 text-xs mb-1" style={{ fontWeight: '600' }}>
                                                    Nombre
                                                </p>
                                                <p className="text-gray-800" style={{ fontSize: '16px', fontWeight: '500' }}>
                                                    {client.name}
                                                </p>
                                            </div>
                                            {client.status && (
                                                <div className="pt-2">
                                                    <p className="text-gray-500 text-xs mb-1" style={{ fontWeight: '600' }}>
                                                        Estado
                                                    </p>
                                                    <span
                                                        className={`inline-block px-3 py-1 rounded-full text-xs ${
                                                            client.status === 'visited'
                                                                ? 'bg-green-100 text-green-700'
                                                                : 'bg-orange-100 text-orange-700'
                                                        }`}
                                                        style={{ fontWeight: '600' }}
                                                    >
                            {client.status === 'visited' ? 'Visitado' : 'Pendiente'}
                          </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Información de contacto */}
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <h3 className="text-gray-700 mb-3" style={{ fontSize: '14px', fontWeight: '700' }}>
                                            Información de contacto
                                        </h3>
                                        <div className="space-y-3">
                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--color-primary)]/10">
                                                    <Phone className="w-5 h-5 text-[var(--color-primary)]" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-gray-500 text-xs mb-1" style={{ fontWeight: '600' }}>
                                                        Teléfono
                                                    </p>
                                                    <p className="text-gray-800" style={{ fontSize: '15px', fontWeight: '500' }}>
                                                        {client.phone}
                                                    </p>
                                                </div>
                                            </div>

                                            {client.email && (
                                                <div className="flex items-start gap-3">
                                                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--color-secondary)]/10">
                                                        <Mail className="w-5 h-5 text-[var(--color-secondary)]" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-gray-500 text-xs mb-1" style={{ fontWeight: '600' }}>
                                                            Correo electrónico
                                                        </p>
                                                        <p className="text-gray-800 break-all" style={{ fontSize: '15px', fontWeight: '500' }}>
                                                            {client.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Dirección y ruta */}
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <h3 className="text-gray-700 mb-3" style={{ fontSize: '14px', fontWeight: '700' }}>
                                            Dirección y ruta
                                        </h3>
                                        <div className="space-y-3">
                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--color-accent)]/10">
                                                    <MapPin className="w-5 h-5 text-[var(--color-accent)]" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-gray-500 text-xs mb-1" style={{ fontWeight: '600' }}>
                                                        Dirección
                                                    </p>
                                                    <p className="text-gray-800" style={{ fontSize: '15px', fontWeight: '500' }}>
                                                        {client.address}
                                                    </p>
                                                </div>
                                            </div>

                                            {client.route && (
                                                <div className="flex items-start gap-3">
                                                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--color-highlight)]/20">
                                                        <Route className="w-5 h-5 text-[var(--color-accent)]" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-gray-500 text-xs mb-1" style={{ fontWeight: '600' }}>
                                                            Ruta asignada
                                                        </p>
                                                        <p className="text-gray-800" style={{ fontSize: '15px', fontWeight: '600' }}>
                                                            {client.route}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="p-6 pt-4 border-t border-gray-200">
                                <button
                                    onClick={onClose}
                                    className="w-full px-6 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors active:scale-[0.98] min-h-[48px]"
                                    style={{ fontWeight: '600' }}
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
