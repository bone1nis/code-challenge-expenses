import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import theme from './theme.ts'

import { RootStoreContext } from './stores/RootStoreContext.ts'
import { RootStore } from './stores/RootStore.ts'

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <RootStoreContext.Provider value={new RootStore()}>
          <CssBaseline />
          <App />
        </RootStoreContext.Provider>
      </ThemeProvider>
    </LocalizationProvider>
  </StrictMode>,
)
