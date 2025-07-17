import React, { createContext, useContext, useState } from 'react';

// type
export type SelectedHexType = { properties: Record<string, any>; center: [number, number] } | null;

// create context
const SelectedHexContext = createContext<{ selectedHex: SelectedHexType; setSelectedHex: (hex: SelectedHexType) => void; } | undefined>(undefined);

// provider action function
export const SelectedHexProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedHex, setSelectedHex] = useState<SelectedHexType>(null);
  return (
    <SelectedHexContext.Provider value={{ selectedHex, setSelectedHex }}>
      {children}
    </SelectedHexContext.Provider>
  );
};

// use context
export const useSelectedHex = () => {
  const context = useContext(SelectedHexContext);
  if (!context) throw new Error('useSelectedHex must be used within a SelectedHexProvider');
  return context;
}; 