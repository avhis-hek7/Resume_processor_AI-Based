import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './app.routes.jsx'
import { AuthProvider } from './features/auth/usecontext/auth.context.jsx'

function App() {
  return (
<AuthProvider>
     <RouterProvider router={router} />
</AuthProvider>
    
  )
}

export default App


// in web development we work in four layer
{/* UI:display to users
   =>component
  =pages
  
  Hook:manage the state and apis layer
  =hooks

  State:data store
  =auth.context.js
  =ai.context.js

  Api:for communication with backend
  =>services
   =>auth.apis.js
  
  
  
  
  
  
  */}
