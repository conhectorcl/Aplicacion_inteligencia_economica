import React, { createContext, useContext, useState } from 'react';

const TabsContext = createContext();

export function Tabs({ children, defaultValue, className = '' }) {
  const [value, setValue] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className = '' }) {
  return <div className={className}>{children}</div>;
}

export function TabsTrigger({ children, value, className = '' }) {
  const { value: active, setValue } = useContext(TabsContext);
  const isActive = active === value;

  return (
    <button
      onClick={() => setValue(value)}
      className={`${className} px-4 py-2 text-sm ${isActive ? 'bg-slate-900 text-white' : 'bg-transparent text-slate-700'}`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ children, value, className = '' }) {
  const { value: active } = useContext(TabsContext);
  if (active !== value) return null;
  return <div className={className}>{children}</div>;
}