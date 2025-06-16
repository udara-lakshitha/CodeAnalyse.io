import { Navigate, Outlet } from 'react-router-dom';

// This component will act as our guard.
const ProtectedRoute = () => {
  // 1. The guard's first job is to check for the magic key.
  const token = localStorage.getItem('jwt_token');

  // 2. The guard's second job is to check if the key is valid.
  // For this simple check, we'll just see if the token exists.
  // In a real-world app, you might decode the token to see if it's expired.
  const isAuthenticated = token ? true : false;

  // 3. The guard's decision.
  if (isAuthenticated) {
    // If the user is authenticated (has a key), let them through.
    // The <Outlet /> component will render the actual page we are protecting (e.g., the Dashboard).
    return <Outlet />;
  } else {
    // If the user is NOT authenticated, send them back to the login page.
    // The <Navigate> component handles the redirection.
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;