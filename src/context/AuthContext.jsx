import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  getCurrentUser,
  getSession,
  onAuthStateChange,
  signInWithPassword,
  signOut,
} from '../services/supabase/auth';

const AuthContext = createContext(null);

const demoUser = {
  id: 'demo-user',
  email: 'hector.mario@conhector.cl',
  name: 'Demo CLARUS',
  role: 'viewer',
  company: 'Empresa Demo',
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(demoUser);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadSession() {
      setLoading(true);

      const { data: sessionData } = await getSession();
      const { data: userData } = await getCurrentUser();

      if (!mounted) return;

      if (sessionData?.session && userData?.user) {
        setSession(sessionData.session);
        setUser({
          id: userData.user.id,
          email: userData.user.email,
          name: userData.user.user_metadata?.name || userData.user.email,
          role: userData.user.user_metadata?.role || 'user',
          company: userData.user.user_metadata?.company || 'Cliente CLARUS',
        });
      } else {
        setSession(null);
        setUser(demoUser);
      }

      setLoading(false);
    }

    loadSession();

    const { data: authListener } = onAuthStateChange((_event, newSession) => {
      setSession(newSession);

      if (newSession?.user) {
        setUser({
          id: newSession.user.id,
          email: newSession.user.email,
          name: newSession.user.user_metadata?.name || newSession.user.email,
          role: newSession.user.user_metadata?.role || 'user',
          company: newSession.user.user_metadata?.company || 'Cliente CLARUS',
        });
      } else {
        setUser(demoUser);
      }
    });

    return () => {
      mounted = false;
      authListener?.subscription?.unsubscribe?.();
    };
  }, []);

  async function login(email, password) {
    const { data, error } = await signInWithPassword(email, password);
    return { data, error };
  }

  async function logout() {
    const { error } = await signOut();
    if (!error) {
      setUser(demoUser);
      setSession(null);
    }
    return { error };
  }

  const value = useMemo(
    () => ({
      user,
      session,
      loading,
      isAuthenticated: !!session?.user,
      login,
      logout,
    }),
    [user, session, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}