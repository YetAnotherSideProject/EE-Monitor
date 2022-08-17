import { Navbar, Image, Container } from 'react-bulma-components'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PagePv from './components/PagePv';
import PageWind from './components/PageWind';

import logoUrl from './assets/logo.svg';

import './App.css'
import PageBiomass from './components/PageBiomass';
import PageWater from './components/PageWater';

function App() {
  const baseUrl = import.meta.env.BASE_URL as string;

  return (
    <Container>
      <BrowserRouter>
        <Navbar>
          <Navbar.Brand>
            <Navbar.Item href={baseUrl}>
              <Image src={logoUrl} size={32}></Image>
            </Navbar.Item>
          </Navbar.Brand>
          
          <Navbar.Item href={baseUrl}>Photovoltaik</Navbar.Item>
          <Navbar.Item href="wind">Windkraft</Navbar.Item>
          <Navbar.Item href="biomass">Biomasse</Navbar.Item>
          <Navbar.Item href="water">Wasserkraft</Navbar.Item>
        </Navbar>

        <Routes>
          {/* TODO Solange PV=/ bzw. Home so lassen, react-router v6 hat keine Redirects mehr */}
          <Route path={baseUrl}>
            <Route index element={<PagePv />} />
            <Route path="wind" element={<PageWind />} />
            <Route path="biomass" element={<PageBiomass />} />
            <Route path="water" element={<PageWater />} />
            <Route path="*" element={<p>404 Error Seite</p>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Container> 
  )
}

export default App
