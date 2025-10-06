import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.tsx'
import { ToastProvider } from './components/toast/ToastProvider.tsx'
import { SidebarProvider } from './components/sidebar/SidebarProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <SidebarProvider>
        <App />
      </SidebarProvider>
    </ToastProvider>
  </StrictMode>,
)
