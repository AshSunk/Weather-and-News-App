import React, { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Layout from './components/Layout';

function App() {
  // Stretch Goal: Light/Dark mode state
  const [darkMode, setDarkMode] = useState(false);

  // Material-UI theme configuration
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#6200ea', // A nice Forge-style purple
      },
    },
  });

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
      <ThemeProvider theme={theme}>
        {/* CssBaseline normalizes the background and text colors based on the theme */}
        <CssBaseline />
        <Layout darkMode={darkMode} toggleTheme={toggleTheme} />
      </ThemeProvider>
  );
}

export default App;
