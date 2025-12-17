import React, { ReactNode, useState } from 'react';
import { Header } from './Header';
import { BottomNav, type NavScreen } from './BottomNav';
import { MobileMenu } from './MobileMenu';

interface ScreenContainerProps {
  title: string;
  children: ReactNode;
  activeScreen: NavScreen;
  onNavigate: (screen: NavScreen | 'profile') => void;
  userName?: string;
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  title,
  children,
  activeScreen,
  onNavigate,
  userName = 'Carlos'
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        title={title}
        userName={userName}
        onMenuClick={() => setIsMenuOpen(true)}
        onAvatarClick={() => onNavigate('profile')}
      />

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={onNavigate}
        userName={userName}
      />

      {/* Contenido con padding para header y bottom nav */}
      <main className="pt-[72px] pb-[80px]">
        {children}
      </main>

      <BottomNav activeScreen={activeScreen} onNavigate={onNavigate} />
    </div>
  );
};
