import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './styles';
import './styles/globals.css';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import './translations/i18n';
import { CreationContextProvider } from './context/CreationContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ElementContextProvider } from './context/ElementContext';
import { PoiContextProvider } from './context/PoiContext';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <PoiContextProvider>
          <CreationContextProvider>
            <ElementContextProvider>
              <App />
            </ElementContextProvider>
          </CreationContextProvider>
        </PoiContextProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
