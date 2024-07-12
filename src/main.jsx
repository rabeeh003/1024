import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <div className='bg-white  border-1 shadow-md rounded-2xl p-2 sm:p-6 '>
    <React.StrictMode>
      <NextUIProvider>
        <App />
      </NextUIProvider>
    </React.StrictMode>
  </div>
)
