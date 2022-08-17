import { Link, Outlet } from "react-router-dom";

function App() {
  const baseUrl = import.meta.env.BASE_URL as string;

  return (
    <div>
      {/* TODO Global Navbar */}
      <nav>
        <Link to="">Photovoltaik</Link>
        <Link to="wind">Windkraft</Link>
        <Link to="biomass">Biomasse</Link>
        <Link to="water">Wasserkraft</Link>
      </nav>
      
      {/* Content, wird gesetzt durch React Router nested Component*/}
      <Outlet />

      {/* TODO Global Footer */}
    </div> 
  )
}

export default App
