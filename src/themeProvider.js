import React, { createContext, useEffect, useState } from 'react';
import themes from './theme/themes';
import {
  handleAsyncReadData,
  handleAsyncSaveData,
} from './services/storeAsyncData';
import { constants } from './theme';
import { useColorScheme } from 'react-native';

export const ThemeContext = createContext(themes.light);

const ThemeProvider = ({children}) => {
  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState(
    systemTheme === 'light' ? themes.light : themes.dark,
  );

  console.log('system', systemTheme);

  useEffect(() => {
    const getTheme = async () => {
      try {
     
        const savedTheme = await handleAsyncReadData(
          constants.storageKeys.SAVEDTHEME,
        );
        if (savedTheme) {
          console.log('saved theme is dark ', savedTheme.dark);
          setTheme(savedTheme);
        } else {
          // If no saved theme, use the system default theme
          setTheme(prevTheme =>
            systemTheme === 'dark' ? themes.dark : themes.light,
          );
        }
      } catch (error) {
        console.log('error fetching theme', error);
      }
    };

    getTheme();
  }, []);

  useEffect(() => {
    if (systemTheme === 'light') {
      toggleTheme(true);
    } else {
      toggleTheme(false);
    }
  }, [systemTheme]);

  const toggleTheme = isDark => {
  
    const newTheme = isDark ? themes.light : themes.dark;
    setTheme(prevTheme => newTheme);
    handleAsyncSaveData(constants.storageKeys.SAVEDTHEME, newTheme);
  };

  console.log('new theme is dark', theme.dark);
  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
