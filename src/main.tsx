import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Global } from '@emotion/react'
import globalStyles from './styles/globalStyles.ts'
import { AlertContextProvider } from './contexts/AlertContext.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthGuard from './components/auth/AuthGuard.tsx'
import { RecoilRoot } from 'recoil'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Global styles={globalStyles} />
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <AlertContextProvider>
          <AuthGuard>
            <App />
          </AuthGuard>
        </AlertContextProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </StrictMode>,
)
