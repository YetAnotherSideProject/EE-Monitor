import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes,  Route} from 'react-router-dom';
import PagePv from './components/PagePv';

import App from './App'
//import './index.css'
import 'bulma/css/bulma.min.css';
import PageWind from './components/PageWind';
import PageBiomass from './components/PageBiomass';
import PageWater from './components/PageWater';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="" element={<App />}>
          <Route index element={<PagePv />} />
          <Route path="wind" element={<PageWind />} />
          <Route path="biomass" element={<PageBiomass />} />
          <Route path="water" element={<PageWater />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
