import { Button, Navbar, Image, Container, Menu } from 'react-bulma-components'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import PagePv from './components/PagePv'

import logoUrl from './assets/logo.svg';
import './App.css'

function App() {
  return (
    <Container>
      <BrowserRouter>
        <Navbar>
          <Navbar.Brand>
            <Navbar.Item href='/'>
              <Image src={logoUrl} size={32}></Image>
            </Navbar.Item>
          </Navbar.Brand>
          
          <Navbar.Item href="/">Photovoltaik</Navbar.Item>
          <Navbar.Item href="/wind">Windkraft</Navbar.Item>
          <Navbar.Item href="/biomass">Biomasse</Navbar.Item>
          <Navbar.Item href="/water">Wasserkraft</Navbar.Item>
        </Navbar>

        <Routes>
          {/* TODO Solange PV=/ bzw. Home so lassen, react-router v6 hat keine Redirects mehr */}
          <Route path="/" element={<PagePv />}></Route>
          <Route path="/wind" element={<p>TODO</p>}></Route>
          <Route path="/biomass" element={<p>TODO</p>}></Route>
          <Route path="/water" element={<p>TODO</p>}></Route>
        </Routes>
      </BrowserRouter>
    </Container> 
  )
}

export default App
