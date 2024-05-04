import { useState } from 'react'
import './index.css'

import { RouterProvider } from 'react-router-dom'
import { router } from './router/index'

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
