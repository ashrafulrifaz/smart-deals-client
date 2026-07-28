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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AllProducts from './pages/AllProducts'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    ErrorBoundary: ErrorPage,
    children: [
      { path: '', Component: Home },
      { path: '/register', Component: Register },
      { path: '/login', Component: Login },
      { path: '/products', Component: AllProducts },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
)