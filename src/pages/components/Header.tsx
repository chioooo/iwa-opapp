import React from 'react';
import { User, Menu } from 'lucide-react';

interface HeaderProps {
  title: string;
  showAvatar?: boolean;
  userName?: string;
  onMenuClick?: () => void;
  onAvatarClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, showAvatar = true, userName = 'Carlos', onMenuClick, onAvatarClick }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary-dark)] to-[var(--color-secondary)] shadow-lg z-50">
      <div className="px-6 py-4 flex items-center justify-between">
        <button
          onClick={onMenuClick}
          className="w-10 h-10 flex items-center justify-center rounded-lg transition-transform active:scale-95"
        >
          <Menu className="w-6 h-6 text-white" strokeWidth={2.5} />
        </button>
        
        {showAvatar && (
          <button
            onClick={onAvatarClick}
            className="flex items-center gap-3 transition-transform active:scale-95"
          >
            <span className="text-white" style={{ fontSize: '15px', fontWeight: '600' }}>
              {userName}
            </span>
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md border border-white/30">
              <User className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
          </button>
        )}
      </div>
    </header>
  );
};