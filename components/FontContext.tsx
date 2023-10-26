'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';
import opentype from 'opentype.js';


const FontContext = createContext(null);

export const useFont = () => {
    return useContext(FontContext);
}

export const FontProvider = ({ children }) => {
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
        

if (!font) return null;
    return (
        <FontContext.Provider value={font}>
            {children}
        </FontContext.Provider>
    );
}
