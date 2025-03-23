import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import MyDevices from './pages/MyDevices';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#00bf72',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h1: {
      fontFamily: "'Poppins', sans-serif",
    },
    h2: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 700,
    },
    h3: {
      fontFamily: "'Poppins', sans-serif",
    },
    h4: {
      fontFamily: "'Poppins', sans-serif",
    },
    h5: {
      fontFamily: "'Poppins', sans-serif",
    },
    h6: {
      fontFamily: "'Poppins', sans-serif",
    },
    subtitle1: {
      fontFamily: "'Poppins', sans-serif",
    },
    subtitle2: {
      fontFamily: "'Poppins', sans-serif",
    },
    body1: {
      fontFamily: "'Poppins', sans-serif",
    },
    body2: {
      fontFamily: "'Poppins', sans-serif",
    },
    button: {
      fontFamily: "'Poppins', sans-serif",
    },
    caption: {
      fontFamily: "'Poppins', sans-serif",
    },
    overline: {
      fontFamily: "'Poppins', sans-serif",
    }
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: '#121212',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: "'Poppins', sans-serif",
        }
      }
    }
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-devices" element={<MyDevices />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
