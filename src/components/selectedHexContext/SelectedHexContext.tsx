import React, { createContext, useContext, useState } from 'react';

export type SelectedHexType = Record<string, any> | null;

const SelectedHexContext = createContext<{
  selectedHex: SelectedHexType;
  setSelectedHex: (hex: SelectedHexType) => void;
} | undefined>(undefined);

export const SelectedHexProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedHex, setSelectedHex] = useState<SelectedHexType>(null);
  return (
    <SelectedHexContext.Provider value={{ selectedHex, setSelectedHex }}>
      {children}
    </SelectedHexContext.Provider>
  );
};

export const useSelectedHex = () => {
  const context = useContext(SelectedHexContext);
  if (!context) throw new Error('useSelectedHex must be used within a SelectedHexProvider');
  return context;
}; 