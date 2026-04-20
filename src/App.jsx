import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { AppProvider, useAppContext } from './context/AppContext';
import AppRouter from './routes/AppRouter';
import GlobalLoader from './components/GlobalLoader';

function AppContent() {
  const { globalLoading, loadingMessage } = useAppContext();

  return (
    <>
      {globalLoading && <GlobalLoader message={loadingMessage} />}
      <AppRouter />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </AuthProvider>
  );
}