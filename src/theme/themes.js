import { DefaultTheme, DarkTheme } from '@react-navigation/native';

const light = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,

    black: 'black',
    white: 'white',
    orange: '#ea7d54',
    purple200: '#312b61',
    blue: 'blue',
    grey: 'grey',
    red: 'red',
    yellow: '#FFDF00',
    transparent: 'transparent',
    torqoise: '#35C2C1',
    purple: '#6770a9',
    darkBlue: '#202152',
    lightBlue: '#49658c',
    backgroundGrey: '#B9B9B9',
    offWhite: '#FAF9F6',
    whiteNoTheme: 'white',
    blackNoTheme: 'black',
    darkBlueNoTheme: '#202152',
    orangeNoTheme: '#ea7d54',
    lightBlueNoTheme: '#49658c',
    lightGrey:'#E0E0E0',
    lightPurple:'#A7A0CF',
    headerGradient: ['#6770a9', '#312b61', '#202152', '#202152'],
  },
  isDark: false
};

const dark = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    black: 'white',
    white: 'black',
    orange: '#E45A27',
    purple200: '#433B84',
    blue: 'blue',
    grey: 'grey',
   
    red: 'red',
    yellow: '#FDCC0D',

    transparent: 'transparent',
    torqoise: '#58D2D1',
    purple: '#50588D',
    darkBlue: '#E2E2F3',
    lightBlue: '#5D7EAB',
    // backgroundGrey:'#B9B9B9',
    backgroundGrey: '#D3D3D3',
    offWhite: 'white',
    whiteText: 'white',
    blackText: 'black',
    whiteNoTheme: 'white',
    blackNoTheme: 'black',
    darkBlueNoTheme: '#202152',
    orangeNoTheme: '#ea7d54',
    lightBlueNoTheme: '#49658c',
    lightGrey:'#E0E0E0',
    lightPurple:'#887EBD',
    headerGradient: ['#50588D', '#433B84', '#2E3077', '#2E3077'],
  },
  isDark:true
};

export default {light, dark};
