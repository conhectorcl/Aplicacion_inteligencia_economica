import React, { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

const mockUser = {
  id: 'usr_001',
  name: 'Héctor Mario',
  email: 'hector.mario@conhector.cl',
  role: 'Director de Estrategia',
  company: 'Conhéctor Consultores - Grupo Conhéctor SpA',
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(mockUser);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const login = async () => {
    setUser(mockUser);
    setIsAuthenticated(true);
    return { success: true, user: mockUser };
  };

  const logout = async () => {
    setIsAuthenticated(false);
    setUser(null);
    return { success: true };
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      login,
      logout,
    }),
    [user, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}