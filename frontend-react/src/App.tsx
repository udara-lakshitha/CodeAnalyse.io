import { Outlet, Link, useLocation, Navigate } from "react-router-dom";

function App() {
  const location = useLocation();

  if (location.pathname === "/") {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <header style={{
        background: '#ffffff',
        padding: '0 2rem',
        borderBottom: '1px solid #e0e0e0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '64px',
      }}>
        <h1 style={{ fontSize: '1.5rem', margin: 0 }}>
          <Link to="/dashboard">
            <span role="img" aria-label="brain icon">🧠</span> CodeAnalyse.io
          </Link>
        </h1>
        <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </nav>
      </header>
      
      <main style={{ padding: '2rem' }}>
        <Outlet />
      </main>
    </div>
  );
}

export default App;