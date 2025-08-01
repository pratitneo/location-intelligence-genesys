import React, { createContext, useContext, useState } from 'react';
import type { BufferType, BufferAnalysisContextType } from '../types/types';

const BufferAnalysisContext = createContext<BufferAnalysisContextType | undefined>(undefined);

export const BufferAnalysisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bufferType, setBufferType] = useState<BufferType>('');
  const [analysisValue, setAnalysisValue] = useState<string>('');
  const [bufferCenter, setBufferCenter] = useState<[number, number] | null>(null);
  const [bufferRadius, setBufferRadius] = useState<number | null>(null);

  return (
    <BufferAnalysisContext.Provider value={{ bufferType, setBufferType, analysisValue, setAnalysisValue, bufferCenter, setBufferCenter, bufferRadius, setBufferRadius }}>
      {children}
    </BufferAnalysisContext.Provider>
  );
};

export const useBufferAnalysis = () => {
  const context = useContext(BufferAnalysisContext);
  if (!context) throw new Error('useBufferAnalysis must be used within a BufferAnalysisProvider');
  return context;
}; 