import { useState } from 'react';
import { LoginScreen } from './pages/screens/LoginScreen';
import { SyncScreen } from './pages/screens/SyncScreen';
import { DashboardScreen } from './pages/screens/DashboardScreen';
import { RoutesScreen } from './pages/screens/RoutesScreen';
import { ClientsScreen } from './pages/screens/ClientsScreen';
import { InventoryScreen } from './pages/screens/InventoryScreen';
import { SalesScreen } from './pages/screens/SalesScreen';
import { ProfileScreen } from './pages/screens/ProfileScreen';
import type {NavScreen} from './pages/components/BottomNav';

type Screen = 'login' | 'sync' | 'dashboard' | 'routes' | 'clients' | 'inventory' | 'sales' | 'profile';

export default function App() {
    const [currentScreen, setCurrentScreen] = useState<Screen>('login');

    const handleLoginSuccess = () => {
        setCurrentScreen('sync');
    };

    const handleSyncComplete = () => {
        setCurrentScreen('dashboard');
    };

    const handleNavigate = (screen: NavScreen | 'profile') => {
        setCurrentScreen(screen as Screen);
    };

    const handleLogout = () => {
        setCurrentScreen('login');
    };

    const handleBackFromProfile = () => {
        setCurrentScreen('dashboard');
    };

    return (
        <>
            {currentScreen === 'login' && <LoginScreen onLoginSuccess={handleLoginSuccess} />}
            {currentScreen === 'sync' && <SyncScreen onSyncComplete={handleSyncComplete} />}
            {currentScreen === 'dashboard' && <DashboardScreen onNavigate={handleNavigate} />}
            {currentScreen === 'routes' && <RoutesScreen onNavigate={handleNavigate} />}
            {currentScreen === 'clients' && <ClientsScreen onNavigate={handleNavigate} />}
            {currentScreen === 'inventory' && <InventoryScreen onNavigate={handleNavigate} />}
            {currentScreen === 'sales' && <SalesScreen onNavigate={handleNavigate} />}
            {currentScreen === 'profile' && <ProfileScreen onBack={handleBackFromProfile} onLogout={handleLogout} />}
        </>
    );
}
