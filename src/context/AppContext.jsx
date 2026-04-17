import React, { createContext, useContext, useMemo, useState } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [filters, setFilters] = useState({
    vertical: 'retail',
    decisionFocus: 'pricing',
    scenario: 'base',
  });

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));

  const value = useMemo(
    () => ({
      filters,
      setFilters,
      selectedDate,
      setSelectedDate,
    }),
    [filters, selectedDate]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}