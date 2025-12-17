import React from 'react';
import { ArrowLeft, User, Mail, Phone, MapPin, LogOut, Settings, Bell } from 'lucide-react';
import logoImage from '../../assets/LOGO IWA_color b.png';

interface ProfileScreenProps {
  onBack: () => void;
  onLogout: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onBack, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="px-6 py-4 flex items-center gap-4">
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full transition-transform active:scale-95"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-gray-800" style={{ fontSize: '18px', fontWeight: '600' }}>
            Mi perfil
          </h1>
        </div>
      </header>

      {/* Contenido */}
      <div className="p-6">
        <div className="max-w-[390px] mx-auto">
          {/* Avatar y datos principales */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] rounded-full flex items-center justify-center mb-4 shadow-lg">
                <User className="w-12 h-12 text-white" strokeWidth={2} />
              </div>
              <h2 className="text-gray-800 mb-1" style={{ fontSize: '22px', fontWeight: '700' }}>
                Carlos Rodríguez
              </h2>
              <p className="text-gray-500">Vendedor</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1">Email</p>
                  <p className="text-gray-800" style={{ fontSize: '14px', fontWeight: '500' }}>
                    carlos.rodriguez@empresa.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1">Teléfono</p>
                  <p className="text-gray-800" style={{ fontSize: '14px', fontWeight: '500' }}>
                    +52 555 123 4567
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1">Zona asignada</p>
                  <p className="text-gray-800" style={{ fontSize: '14px', fontWeight: '500' }}>
                    Ciudad de México - Centro
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Opciones */}
          <div className="bg-white rounded-2xl shadow-md mb-6 overflow-hidden">
            <button className="w-full flex items-center gap-3 p-4 border-b border-gray-100 transition-colors active:bg-gray-50">
              <Settings className="w-5 h-5 text-gray-600" />
              <span className="flex-1 text-left text-gray-800" style={{ fontSize: '15px', fontWeight: '500' }}>
                Configuración
              </span>
            </button>
            <button className="w-full flex items-center gap-3 p-4 transition-colors active:bg-gray-50">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="flex-1 text-left text-gray-800" style={{ fontSize: '15px', fontWeight: '500' }}>
                Notificaciones
              </span>
            </button>
          </div>

          {/* Botón cerrar sesión */}
          <button
            onClick={onLogout}
            className="w-full bg-white border-2 border-[var(--color-primary)] text-[var(--color-primary)] py-4 rounded-xl shadow-md transition-transform active:scale-[0.98] flex items-center justify-center gap-2"
            style={{ fontSize: '16px', fontWeight: '600' }}
          >
            <LogOut className="w-5 h-5" />
            Cerrar sesión
          </button>

          {/* Footer */}
          <div className="mt-8 flex flex-col items-center gap-3">
            <img src={logoImage} alt="IWA Logo" className="w-16 h-16 object-contain opacity-60" />
            <p className="text-gray-400 text-xs text-center">
              Design and development by IWA Consolti
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
