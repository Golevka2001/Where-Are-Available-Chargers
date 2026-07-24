import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';

export default createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          background: '#F8F9FA',
          surface: '#FCFCFC',
          primary: '#478ACC',
          secondary: '#A37ACC',
          error: '#F07171',
          info: '#D3E2F5',
          success: '#86B300',
          warning: '#F2AE49',
          default: '#c0c0bb',
        },
      },
      dark: {
        dark: true,
        colors: {
          background: '#111111',
          surface: '#1B1B1B',
          primary: '#73B8FF',
          secondary: '#D2A6FF',
          error: '#F07178',
          info: '#1B3A5B',
          success: '#AAD94C',
          warning: '#FFB454',
          default: '#979690',
        },
      },
    },
  },
});
