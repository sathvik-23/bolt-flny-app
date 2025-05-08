import React, { createContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

type ThemeColors = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  cardBackground: string;
  text: string;
  textSecondary: string;
  invertedText: string;
  border: string;
  disabled: string;
  error: string;
  success: string;
  warning: string;
  inputBackground: string;
  accentBackground: string;
};

type Theme = {
  dark: boolean;
  colors: ThemeColors;
  toggleTheme: () => void;
};

const lightColors: ThemeColors = {
  primary: '#000000',
  secondary: '#1a1a1a',
  accent: '#404040',
  background: '#FFFFFF',
  cardBackground: '#FFFFFF',
  text: '#000000',
  textSecondary: '#666666',
  invertedText: '#FFFFFF',
  border: '#E5E5E5',
  disabled: '#D4D4D4',
  error: '#DC2626',
  success: '#059669',
  warning: '#D97706',
  inputBackground: '#F9F9F9',
  accentBackground: '#F5F5F5',
};

const darkColors: ThemeColors = {
  primary: '#FFFFFF',
  secondary: '#E5E5E5',
  accent: '#D4D4D4',
  background: '#000000',
  cardBackground: '#1A1A1A',
  text: '#FFFFFF',
  textSecondary: '#A3A3A3',
  invertedText: '#000000',
  border: '#404040',
  disabled: '#525252',
  error: '#EF4444',
  success: '#10B981',
  warning: '#F59E0B',
  inputBackground: '#262626',
  accentBackground: '#0A0A0A',
};

export const ThemeContext = createContext<Theme | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const deviceTheme = useColorScheme();
  const [isDark, setIsDark] = useState(false); // Force light theme

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const theme: Theme = {
    dark: isDark,
    colors: lightColors, // Always use light theme
    toggleTheme,
  };

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};