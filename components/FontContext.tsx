'use client'
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import opentype from 'opentype.js';

const FontContext = createContext<opentype.Font | null>(null);
        

export const useFont = () => {
    return useContext(FontContext);
}
interface FontProviderProps {
    children: ReactNode;
}

export const FontProvider: React.FC<FontProviderProps>= ({ children }) => {
    const [font, setFont] = useState<opentype.Font | null>(null);

    useEffect(() => {
        opentype.load('/MigaeSemibold-3zd2M.otf', (err, loadedFont) => {
            if (err) {
                console.error('Font could not be loaded:', err);
                return;
            }
            if (!loadedFont) return null;
            setFont(loadedFont);
        });
    }, []);

if (font === null)  return null 
else {
        return (
        <FontContext.Provider value={font}>
            {children}
        </FontContext.Provider>
    );
}

}
