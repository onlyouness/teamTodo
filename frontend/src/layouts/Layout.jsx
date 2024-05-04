import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import "../index.css"
import 'tailwindcss/tailwind.css';
import {AuthContextProvider} from "../context/AuthContext"


function Layout() {
  return (
      <>
          <header>
              <Sidebar />
          </header>
          <main className='p-4 mt-20 sm:ml-44'>
              <AuthContextProvider>
              <Outlet />
                  
          </AuthContextProvider>
          </main>
      </>
  )
}

export default Layout