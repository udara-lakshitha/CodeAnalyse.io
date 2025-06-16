// App.tsx
import { Outlet, Link, useLocation, Navigate } from "react-router-dom";

const App = () => {
  // useLocation gives us information about the current URL.
  const location = useLocation();

  // If the user is at the absolute root path, redirect them to the login page.
  if (location.pathname === "/") {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <header style={{ 
        padding: '1rem', 
        backgroundColor: '#f0f0f0', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <h1>
          <Link to = "/dashboard" style = {{ textDecoration: 'none', color: 'inherit' }}>
            CodeAnalyse.io
          </Link>
        </h1>
        <nav>
          <Link to = "/login" style = {{ marginRight: '1rem' }}>Login</Link>
          <Link to = "/signup">Sign Up</Link>
        </nav>
      </header>
      
      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>
    </div>
  );
}

export default App;