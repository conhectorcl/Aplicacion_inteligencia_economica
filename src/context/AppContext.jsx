import React, { createContext, useContext, useMemo, useState } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [filters, setFilters] = useState({
    vertical: 'retail',
    decisionFocus: 'pricing',
    dateRange: '30d',
  });

  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedScenario, setSelectedScenario] = useState('base');

  const [globalLoading, setGlobalLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Cargando...');

  const showLoading = (message = 'Cargando...') => {
    setLoadingMessage(message);
    setGlobalLoading(true);
  };

  const hideLoading = () => {
    setGlobalLoading(false);
    setLoadingMessage('Cargando...');
  };

  const value = useMemo(
    () => ({
      filters,
      setFilters,
      selectedProductId,
      setSelectedProductId,
      selectedScenario,
      setSelectedScenario,
      globalLoading,
      loadingMessage,
      showLoading,
      hideLoading,
    }),
    [
      filters,
      selectedProductId,
      selectedScenario,
      globalLoading,
      loadingMessage,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}