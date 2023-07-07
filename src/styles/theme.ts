import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    common: {
      black: '#343A40',
      white: '#FFFFFF'
    },
    primary: {
      main: '#1D8632'
    },
    text: {
      primary: '#343A40',
      secondary: '#FFFFFF'
    },
    background: {
      default: '#F5F5F5',
      paper: '#ECF0F2'
    }
  },

  typography: {
    fontFamily: ['-apple-system, BlinkMacSystemFont, sans-serif'].join(',')
  },

  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#343A40'
        }
      }
    }
  }
});

export { theme };
