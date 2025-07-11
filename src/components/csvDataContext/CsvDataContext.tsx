import React, { createContext, useContext, useState } from 'react';

export type CsvDataContextType = {
  csvData: any[];
  setCsvData: (data: any[]) => void;
};

const CsvDataContext = createContext<CsvDataContextType | undefined>(undefined);

export const CsvDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [csvData, setCsvData] = useState<any[]>([]);
  return (
    <CsvDataContext.Provider value={{ csvData, setCsvData }}>
      {children}
    </CsvDataContext.Provider>
  );
};

export const useCsvData = () => {
  const context = useContext(CsvDataContext);
  if (!context) {
    throw new Error('useCsvData must be used within a CsvDataProvider');
  }
  return context;
}; 