// App.tsx
import { Outlet } from "react-router-dom"; // Import Outlet

const App = () => {
  return (
    <div>
      {/* We can put a shared navigation bar or header here later */}
      <header style={{ padding: '1rem', backgroundColor: '#f0f0f0' }}>
        <h1>CodeAnalyse.io</h1>
        {/* We can add navigation links here later */}
      </header>
      
      <main>
        {/* The Outlet component is a special placeholder provided by react-router-dom.
            It tells the router: "If the URL matches one of the child routes,
            render that child's element right here." */}
        <Outlet />
      </main>
    </div>
  );
}

export default App;