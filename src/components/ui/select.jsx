import React, { createContext, useContext } from 'react';

const SelectContext = createContext();

export function Select({ value, onValueChange, children }) {
  return (
    <SelectContext.Provider value={{ value, onValueChange }}>
      <div>{children}</div>
    </SelectContext.Provider>
  );
}

export function SelectTrigger({ children, className = '' }) {
  return <div className={`rounded-md border border-slate-300 bg-white px-3 py-2 text-sm ${className}`}>{children}</div>;
}

export function SelectValue({ placeholder }) {
  const { value } = useContext(SelectContext);
  return <span>{value || placeholder}</span>;
}

export function SelectContent({ children }) {
  return <div className="mt-2 space-y-1 rounded-md border border-slate-200 bg-white p-2">{children}</div>;
}

export function SelectItem({ value, children }) {
  const { onValueChange } = useContext(SelectContext);

  return (
    <div
      onClick={() => onValueChange?.(value)}
      className="cursor-pointer rounded px-2 py-1 text-sm hover:bg-slate-100"
    >
      {children}
    </div>
  );
}