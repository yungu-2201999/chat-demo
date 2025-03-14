import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@unocss/reset/sanitize/sanitize.css'
import '@unocss/reset/sanitize/assets.css'
import App from './App.tsx'
import 'virtual:uno.css'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
