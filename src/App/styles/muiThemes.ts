import { createTheme, ThemeOptions } from '@mui/material/styles';

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#5865f2',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: 'var(--canvas-secondary)',
          backgroundImage: 'none',
          border: '1px solid var(--ui-button)',
          marginTop: '8px',
        },
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          backgroundColor: 'var(--canvas-secondary-deeper)',
        },
      },
    },
  },
};

export const dark = createTheme(themeOptions);

themeOptions.palette!.mode = 'light';

export const light = createTheme(themeOptions);
