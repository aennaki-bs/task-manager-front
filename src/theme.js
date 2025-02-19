import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Blue
    },
    secondary: {
      main: '#dc004e', // Pink
    },
    background: {
      default: '#f5f5f5', // Light gray
      paper: '#ffffff', // White
    },
    text: {
      primary: '#333333', // Dark gray
      secondary: '#666666', // Medium gray
    },
  },
});

export default theme;