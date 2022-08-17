import { Navbar, Image, Container } from 'react-bulma-components'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PagePv from './components/PagePv'

import logoUrl from './assets/logo.svg';

import './App.css'

function App() {
  const baseUrl = import.meta.env.BASE_URL as string;

  return (
    <Container>
      <BrowserRouter>
        <Navbar>
          <Navbar.Brand>
            <Navbar.Item href='/'>
              <Image src={logoUrl} size={32}></Image>
            </Navbar.Item>
          </Navbar.Brand>
          
          <Navbar.Item href={baseUrl}>Photovoltaik</Navbar.Item>
          <Navbar.Item href={baseUrl.concat("wind")}>Windkraft</Navbar.Item>
          <Navbar.Item href={baseUrl + "biomass"}>Biomasse</Navbar.Item>
          <Navbar.Item href={baseUrl + "water"}>Wasserkraft</Navbar.Item>
        </Navbar>

        <Routes>
          {/* TODO Solange PV=/ bzw. Home so lassen, react-router v6 hat keine Redirects mehr */}
          <Route path={baseUrl} element={<PagePv />}></Route>
          <Route path={baseUrl + "wind"} element={<p>TODO</p>}></Route>
          <Route path={baseUrl + "biomass"} element={<p>TODO</p>}></Route>
          <Route path={baseUrl + "water"} element={<p>TODO</p>}></Route>
        </Routes>
      </BrowserRouter>
    </Container> 
  )
}

export default App
