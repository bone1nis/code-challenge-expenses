import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material'
import theme from './theme.ts'

import { RootStoreContext } from './stores/RootStoreContext.ts'
import { RootStore } from './stores/RootStore.ts'

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootStoreContext.Provider value={new RootStore()}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </RootStoreContext.Provider>
  </StrictMode>,
)
