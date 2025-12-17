import React, { useState, FormEvent } from 'react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import logoImage from '../../assets/LOGO IWA_color b.png';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      onLoginSuccess();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-between p-6 relative">
      <div className="flex items-center justify-center pt-8 pb-4">
        <div className="w-40 h-40 flex items-center justify-center">
          <img src={logoImage} alt="IWA Logo" className="w-full h-full object-contain" />
        </div>
      </div>

      <div className="w-full max-w-[390px] flex-1 flex items-center justify-center pb-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full">
          <h1 className="text-gray-800 mb-2 text-center">
            IWA OperativeApp
          </h1>

          <p className="text-gray-500 text-center mb-8">
            Ingresa tus credenciales para continuar
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Correo electrónico"
              type="email"
              placeholder="ejemplo@empresa.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />

            <Input
              label="Contraseña"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />

            <Button type="submit" loading={loading}>
              Iniciar sesión
            </Button>

            <div className="text-center pt-2">
              <button
                type="button"
                className="text-[var(--color-primary)] hover:underline"
                onClick={() => alert('Funcionalidad de recuperación de contraseña')}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          </form>
        </div>
      </div>

      <footer className="w-full py-6 text-center">
        <p className="text-gray-400 text-xs opacity-70">
          Design and development by IWA Consolti
        </p>
      </footer>
    </div>
  );
};
