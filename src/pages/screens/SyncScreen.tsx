import React, { useState, useEffect } from 'react';
import { SyncTask } from '../components/SyncTask';
import { Database } from 'lucide-react';

interface SyncScreenProps {
  onSyncComplete: () => void;
}

const syncTasks = [
  'Descargando catálogo de productos',
  'Actualizando clientes',
  'Sincronizando inventario',
  'Sincronizando rutas y visitas',
  'Finalizando sincronización'
];

export const SyncScreen: React.FC<SyncScreenProps> = ({ onSyncComplete }) => {
  const [currentTask, setCurrentTask] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (currentTask < syncTasks.length) {
      const timer = setTimeout(() => {
        setCurrentTask(prev => prev + 1);
        setProgress(((currentTask + 1) / syncTasks.length) * 100);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      const completeTimer = setTimeout(() => {
        onSyncComplete();
      }, 500);
      return () => clearTimeout(completeTimer);
    }
  }, [currentTask, onSyncComplete]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-[390px]">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Ícono */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] rounded-2xl flex items-center justify-center">
              <Database className="w-10 h-10 text-white animate-pulse" strokeWidth={2} />
            </div>
          </div>

          {/* Título */}
          <h2 className="text-gray-800 text-center mb-2">
            Sincronizando datos con SAP...
          </h2>
          <p className="text-gray-500 text-center mb-8">
            Esto puede tardar unos segundos
          </p>

          {/* Barra de progreso */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Progreso</span>
              <span className="text-sm text-[var(--color-primary)]">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Lista de tareas */}
          <div className="space-y-1">
            {syncTasks.map((task, index) => (
              <SyncTask
                key={index}
                title={task}
                status={
                  index < currentTask ? 'completed' : 
                  index === currentTask ? 'loading' : 
                  'pending'
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};