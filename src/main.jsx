import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import ErrorPage from './pages/ErrorPages'
import Register from './pages/Register'
import Login from './pages/Login'
import AuthProvider from './context/AuthProvider'

const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    ErrorBoundary: ErrorPage,
    children: [
      { path: '', Component: Home },
      { path: '/register', Component: Register },
      { path: '/login', Component: Login },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
)