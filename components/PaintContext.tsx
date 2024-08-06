'use client'
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import opentype from 'opentype.js';

interface PaintContextInterface {
  paint: boolean;
  paintPage: () => void;
}


const PaintContext = createContext<PaintContextInterface | undefined>(undefined);



interface PaintProviderProps {
  children: ReactNode;
}

export const PaintProvider: React.FC<PaintProviderProps> = ({ children }) => {
  const [paint, setPaint] = useState(false);

  const paintPage = () => { setPaint(!paint) }
  return (
    <PaintContext.Provider value={{ paint, paintPage }}>
      {children}
    </PaintContext.Provider>
  );
}

export const usePaint = () => {
  const context = useContext(PaintContext);
  if (context === undefined) {
    throw new Error('useToggle must be used within a ToggleProvider');
  }
  return context;
};
