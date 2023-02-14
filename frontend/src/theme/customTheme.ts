import { ThemeOptions, createTheme } from '@mui/material';

export const customTheme: ThemeOptions = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main : 'hsl(201, 96%, 48%)',
      light : 'hsla(201, 96%, 48%, .8)',
      dark : 'hsla(201, 96%, 48%, .6)'
    },
    background: {
      paper: '#151515',
      default: 'rgba(0,0,0,.96)',
    },
  },
});
