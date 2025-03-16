// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: "#E5D9F2", // Page background color
      //paper: "#ffffff",  // Background color for components like cards
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '&.input-field': {
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '4px',
              
              // Style the input border
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.3)',
              },
              
              // Style the input when hovered
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.5)',
              },
              
              // Style the input when focused
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#000000',
              },
            },
            
            // Style the input text entered by user
            '& .MuiInputBase-input': {
              color: 'rgba(0, 0, 0, 0.9)',
            },
            
            // Style the helper text
            '& .MuiFormHelperText-root': {
              color: 'rgba(252, 0, 0, 0.7)',
              
              // Style the helper text when error
              '&.Mui-error': {
                color: '#f44336',
              },
            },
            
            // Style the label text
            '& .MuiInputLabel-root': {
              color: 'rgba(0, 0, 0, 0.7) !important',
              
              // Style for when the label is focused
              '&.Mui-focused': {
                color: 'rgba(0, 0, 0, 0.9) !important',
              },
            },
            
            // Style the password visibility toggle icon
            '& .MuiIconButton-root': {
              color: 'rgba(0, 0, 0, 0.7)',
              
              // Style the hover state
              '&:hover': {
                color: 'rgba(0, 0, 0, 0.9)',
              },
            },
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: 'rgba(0, 0, 0, 0.7)',
          '&.Mui-focused': {
            color: 'rgba(0, 0, 0, 0.9)',
          }
        }
      }
    },
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
    },
  },

});

export default theme;
