import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@mantine/core/styles.css'
import './index.css'
import { MantineProvider } from '@mantine/core'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider theme={{ fontFamily: "'Inter', sans-serif", fontFamilyMonospace: "monospace" }}>
      <App />
    </MantineProvider>
  </StrictMode>,
)
