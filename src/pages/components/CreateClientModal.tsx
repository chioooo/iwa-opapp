import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Input } from './Input';
import { Button } from './Button';

interface CreateClientModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (client: NewClientData) => void;
}

export interface NewClientData {
    name: string;
    phone: string;
    email: string;
    address: string;
    route: string;
}

export const CreateClientModal: React.FC<CreateClientModalProps> = ({
                                                                        isOpen,
                                                                        onClose,
                                                                        onSave,
                                                                    }) => {
    const [formData, setFormData] = useState<NewClientData>({
        name: '',
        phone: '',
        email: '',
        address: '',
        route: '',
    });

    const [errors, setErrors] = useState<Partial<Record<keyof NewClientData, string>>>({});

    const routes = ['Ruta 1', 'Ruta 2', 'Ruta 3', 'Ruta 4', 'Ruta 5'];

    const handleInputChange = (field: keyof NewClientData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        // Limpiar error al escribir
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: '' }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof NewClientData, string>> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'El nombre es obligatorio';
        }
        if (!formData.phone.trim()) {
            newErrors.phone = 'El teléfono es obligatorio';
        }
        if (!formData.address.trim()) {
            newErrors.address = 'La dirección es obligatoria';
        }
        if (!formData.route) {
            newErrors.route = 'Debe seleccionar una ruta';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (validateForm()) {
            onSave(formData);
            // Limpiar formulario
            setFormData({
                name: '',
                phone: '',
                email: '',
                address: '',
                route: '',
            });
            setErrors({});
        }
    };

    const handleClose = () => {
        setFormData({
            name: '',
            phone: '',
            email: '',
            address: '',
            route: '',
        });
        setErrors({});
        onClose();
    };

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
                        onClick={handleClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        onClick={(e) => e.target === e.currentTarget && handleClose()}
                    >
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[390px] max-h-[90vh] flex flex-col">
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-200">
                                <h2 className="text-gray-800" style={{ fontSize: '20px', fontWeight: '700' }}>
                                    Nuevo cliente
                                </h2>
                                <button
                                    onClick={handleClose}
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors active:scale-95"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="flex-1 overflow-y-auto px-6 py-6">
                                <div className="space-y-4">
                                    <Input
                                        label="Nombre del cliente"
                                        type="text"
                                        placeholder="Ej: Abarrotes La Esquina"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        error={errors.name}
                                    />

                                    <Input
                                        label="Teléfono"
                                        type="tel"
                                        placeholder="Ej: 555-0101"
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                        error={errors.phone}
                                    />

                                    <Input
                                        label="Correo electrónico"
                                        type="email"
                                        placeholder="Ej: cliente@ejemplo.com"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        error={errors.email}
                                    />

                                    <Input
                                        label="Dirección"
                                        type="text"
                                        placeholder="Ej: Av. Principal 123"
                                        value={formData.address}
                                        onChange={(e) => handleInputChange('address', e.target.value)}
                                        error={errors.address}
                                    />

                                    {/* Select de Ruta */}
                                    <div className="w-full">
                                        <label className="block text-gray-700 mb-2">
                                            Ruta asignada
                                        </label>
                                        <select
                                            value={formData.route}
                                            onChange={(e) => handleInputChange('route', e.target.value)}
                                            className={`w-full px-4 py-3 bg-white border rounded-lg transition-colors outline-none ${
                                                errors.route
                                                    ? 'border-[var(--color-error)] focus:border-[var(--color-error)]'
                                                    : 'border-gray-300 focus:border-[var(--color-primary)]'
                                            }`}
                                        >
                                            <option value="">Seleccionar ruta</option>
                                            {routes.map((route) => (
                                                <option key={route} value={route}>
                                                    {route}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.route && (
                                            <p className="mt-2 text-[var(--color-error)] text-sm">
                                                {errors.route}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="p-6 pt-4 border-t border-gray-200">
                                <Button onClick={handleSave}>
                                    Guardar cliente
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

