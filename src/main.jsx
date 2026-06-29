import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.css'
import { installKnownConsoleWarningFilter } from '@/utils/knownConsoleWarnings'
import App from '@/App.jsx'

installKnownConsoleWarningFilter()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
