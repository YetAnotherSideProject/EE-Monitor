//API & Data
import { supabase } from "./lib/SupabaseClient";
import { useLoaderData } from "react-router-dom";
import { Gemeinde } from "./lib/Types";
//Components
import { Outlet, NavLink } from "react-router-dom";
//Assets
import "./App.css"; // will be injected into the page
import logoUrl from "./assets/logo.svg";

export default function App() {
  const gemeinde = useLoaderData() as Gemeinde;

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
        <Outlet context={gemeinde} />
      </main>

      {/* Global Footer */}
      <footer>
        <p>Erstellt von Martin Schulze Beckendorf</p>
      </footer>
    </>
  );
}

//TODO auslagern in /lib als Teil des API Clients?
export async function gemeindeLoader() {
  //TODO Error Handling
  let { data: gemeinde, error: errorGemeinde } = await supabase
    .from("gemeinde")
    .select("*")
    .eq("schluessel", import.meta.env.VITE_MASTR_CITY_KEY)
    .single();

  return gemeinde;
}
