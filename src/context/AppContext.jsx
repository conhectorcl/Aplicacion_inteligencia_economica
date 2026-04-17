import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [sector, setSector] = useState('retail');
  const [fechaCorte, setFechaCorte] = useState('2026-06');

  return (
    <AppContext.Provider value={{ sector, setSector, fechaCorte, setFechaCorte }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}