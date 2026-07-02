import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { SiteContentProvider } from './context/SiteContentContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <SiteContentProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SiteContentProvider>
  </HelmetProvider>,
)
