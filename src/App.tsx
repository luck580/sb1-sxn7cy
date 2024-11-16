import React from 'react';
import { useAuth } from './hooks/useAuth';
import AuthScreen from './components/auth/AuthScreen';
import DashboardLayout from './components/layout/DashboardLayout';

function App() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
      </div>
    );
  }

  return user ? <DashboardLayout /> : <AuthScreen />;
}

export default App;