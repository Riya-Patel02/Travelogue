import {useTheme} from '@react-navigation/native';
import {useContext} from 'react';
import {ThemeContext} from '../themeProvider';

const useThemedStyles = styles => {
  
  const {theme} = useContext(ThemeContext);

  // console.log('themes',theme);
  return styles(theme.colors);
};

export default useThemedStyles;
