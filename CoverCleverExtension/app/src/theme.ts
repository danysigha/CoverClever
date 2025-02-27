// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: '64px',
          padding: "0 16px",
        },
      },
    },
    MuiAppBar: {
        styleOverrides: {
            root: {
                position: "fixed",
                top: "0",
                left: "0",
                right: "0",
                zIndex: 1100,
            }
        }
    }
  },
});

export default theme;
