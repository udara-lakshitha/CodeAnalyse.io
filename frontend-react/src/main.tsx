import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import SignupPage from './pages/SignupPage.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx'
import { SnackbarProvider } from './context/SnackbarContext.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <LoginPage />
      },
      {
        path: "/signup",
        element: <SignupPage />
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/dashboard",
            element: <DashboardPage />
          },
        ]
      }
    ]
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SnackbarProvider>
      <RouterProvider router={router} />
    </SnackbarProvider>
  </StrictMode>,
)
