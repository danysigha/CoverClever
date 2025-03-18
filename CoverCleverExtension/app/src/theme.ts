// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: "#E5D9F2", // Light purple background color for the entire application
    },
  },
  components: {
    // Text field component styling overrides
    MuiTextField: {
      styleOverrides: {
        root: {
          // Apply these styles only to text fields with the 'input-field' class
          '&.input-field': {
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '4px',
              
              // Normal state border styling
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.3)',
              },
              
              // Hover state border styling - becomes more opaque when hovered
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.5)',
              },
              
              // Focus state border styling - solid black border when field is active
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#000000',
              },
            },
            
            // Text color for user input within text fields
            '& .MuiInputBase-input': {
              color: 'rgba(0, 0, 0, 0.9)',
            },
            
            // Helper/error text styling below the input field
            '& .MuiFormHelperText-root': {
              color: 'rgba(252, 0, 0, 0.7)',
              
              // Error state helper text styling
              '&.Mui-error': {
                color: '#f44336',
              },
            },
            
            // Input label styling (placeholder/floating label)
            '& .MuiInputLabel-root': {
              color: 'rgba(0, 0, 0, 0.7) !important',
              
              // Focus state for input labels
              '&.Mui-focused': {
                color: 'rgba(0, 0, 0, 0.9) !important',
              },
            },
            
            // Icon button styling (like password visibility toggle)
            '& .MuiIconButton-root': {
              color: 'rgba(0, 0, 0, 0.7)',
              
              // Hover state for icon buttons
              '&:hover': {
                color: 'rgba(0, 0, 0, 0.9)',
              },
            },
          },
        },
      },
    },
    // Global input label styling (affects all input labels, not just in text fields)
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
    // Toolbar component styling (typically used in AppBar/header)
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: '64px',
          padding: "0 16px",
        },
      },
    },

    // App bar (top navigation) styling
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
