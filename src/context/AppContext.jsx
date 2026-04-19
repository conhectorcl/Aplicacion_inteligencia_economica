import React, { createContext, useContext, useMemo, useState } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [filters, setFilters] = useState({
    vertical: 'retail',
    decisionFocus: 'pricing',
    scenario: 'base',
  });

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [selectedProductId, setSelectedProductId] = useState('');
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);

  const value = useMemo(
    () => ({
      filters,
      setFilters,
      selectedDate,
      setSelectedDate,
      selectedProductId,
      setSelectedProductId,
      selectedCompanyId,
      setSelectedCompanyId,
    }),
    [filters, selectedDate, selectedProductId, selectedCompanyId]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}