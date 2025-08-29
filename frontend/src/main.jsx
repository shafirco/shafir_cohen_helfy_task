import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css' // ודא שהקובץ הזה באמת קיים

createRoot(document.getElementById('root')).render(<App />)
