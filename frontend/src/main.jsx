/** 
 * main.jsx - Application entry point
 * 
 * Creates a React root and renders the App component
 * as the root of the React component tree.
 * Wrapped in strictmode to enforce additional checks and warnings.
*/

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

