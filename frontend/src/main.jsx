import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import {AuthContextProvider} from "./context/AuthContext.jsx"



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="1002126857233-lsmcv5vb1s5h1hivm6ik6mkb67gi297f.apps.googleusercontent.com">
    <AuthContextProvider>
      <App />
      </AuthContextProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
