import React,{useContext} from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import "../index.css"
import 'tailwindcss/tailwind.css';
import {AuthContextProvider} from "../context/AuthContext"
import {AuthContext} from "../context/AuthContext"

function Layout() {
    const { currentUser, isLoading } = useContext(AuthContext)
    if (isLoading) {
        return <div>Loading...</div>
    }
  return (
      <>
              <AuthContextProvider>
          <header>
              <Sidebar />
          </header>
          <main className='p-4 mt-20 sm:ml-44'>
              <Outlet />
                  
          </main>
          </AuthContextProvider>
      </>
  )
}

export default Layout