// React
import { Outlet, NavLink } from "react-router-dom";

// Assets
import "./App.css"; // will be injected into the page
import logoUrl from "./assets/logo.svg";

export default function App() {
  return (
    <>
      <header>
        {/* Global Top Navbar */}
        <nav>
          <NavLink to={""} className="logo">
            <img src={logoUrl} alt="Logo icon" />
          </NavLink>
          <ul>
            <li>
              <NavLink to={""}>Photovoltaik</NavLink>
            </li>
            <li>
              <NavLink to={"wind"}>Windkraft</NavLink>
            </li>
            <li>
              <NavLink to={"biomass"}>Biomasse</NavLink>
            </li>
            <li>
              <NavLink to={"water"}>Wasserkraft</NavLink>
            </li>
          </ul>
        </nav>
      </header>

      {/* Content, wird gesetzt durch React Router nested Component*/}
      <main>
        <Outlet />
      </main>

      {/* Global Footer */}
      <footer>
        <p>Erstellt von Martin Schulze Beckendorf</p>
      </footer>
    </>
  );
}
