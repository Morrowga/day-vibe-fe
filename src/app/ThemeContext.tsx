import React, { createContext, useMemo, useState, useContext, useEffect, ReactNode } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

interface ThemeContextProps {
  mode: PaletteMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  mode: 'light',
  toggleTheme: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

interface ThemeContextProviderProps {
  children: ReactNode;
}

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>('light');

  useEffect(() => {
    // Check for localStorage on the client side
    const savedMode = localStorage.getItem('theme') as PaletteMode;
    if (savedMode) {
      setMode(savedMode);
    }
  }, []);

  const theme = useMemo(() => 
    createTheme({
      palette: {
        mode,
        ...(mode === 'light'
          ? {
              primary: { main: '#053020' }, 
              secondary: { main: '#F5A623' }, 
              background: { default: '#efdecd', paper: '#FFFFFF' }, 
              text: { primary: '#333333', secondary: '#666666' }, 
              info: { main: '#053020'}
            }
          : {
              primary: { main: '#90CAF9' }, 
              secondary: { main: '#F48FB1' },
              background: { default: '#121212', paper: '#1E1E1E' }, 
              text: { primary: '#FFFFFF', secondary: '#B0B0B0' },
              info: { main: '#FFFFFF'}
            }),
      },
    }), 
    [mode]
  );

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('theme', newMode);
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
