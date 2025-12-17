import React from 'react';
import { Check, Loader2 } from 'lucide-react';

interface SyncTaskProps {
  title: string;
  status: 'pending' | 'loading' | 'completed';
}

export const SyncTask: React.FC<SyncTaskProps> = ({ title, status }) => {
  return (
    <div className="flex items-center gap-4 py-3">
      <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
        {status === 'completed' && (
          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center animate-in zoom-in duration-300">
            <Check className="w-4 h-4 text-white" strokeWidth={3} />
          </div>
        )}
        {status === 'loading' && (
          <Loader2 className="w-6 h-6 text-[var(--color-primary)] animate-spin" />
        )}
        {status === 'pending' && (
          <div className="w-6 h-6 rounded-full border-2 border-gray-300" />
        )}
      </div>
      <p className={`flex-1 ${status === 'completed' ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
        {title}
      </p>
    </div>
  );
};
