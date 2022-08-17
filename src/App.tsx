import { Container, Navbar, Image } from "react-bulma-components";
import { Link, Outlet } from "react-router-dom";

import logoUrl from './assets/logo.svg';

function App() {

  return (
    <Container>
      {/* Global Navbar */}
      <Navbar>
        <Navbar.Brand>
          <Navbar.Item to="" renderAs={Link}>
            <Image src={logoUrl} size={32}></Image>
          </Navbar.Item>
        </Navbar.Brand>
        <Navbar.Item to="" renderAs={Link}>Photovoltaik</Navbar.Item>
        <Navbar.Item to="wind" renderAs={Link}>Windkraft</Navbar.Item>
        <Navbar.Item to="biomass" renderAs={Link}>Biomasse</Navbar.Item>
        <Navbar.Item to="water" renderAs={Link}>Wasserkraft</Navbar.Item>
      </Navbar>
      
      {/* Content, wird gesetzt durch React Router nested Component*/}
      <Outlet />

      {/* TODO Global Footer */}
    </Container> 
  )
}

export default App
