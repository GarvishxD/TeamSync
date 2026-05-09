import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.jsx'
import './index.css'

import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>

    <Toaster
      position="top-right"
      toastOptions={{

        duration:3000,

        style:{
          background:"#ffffff",
          color:"#0f172a",
          borderRadius:"16px",
          padding:"16px",
          fontSize:"15px",
          boxShadow:"0px 10px 30px rgba(0,0,0,0.1)"
        }

      }}
    />

    <App />

  </React.StrictMode>

)