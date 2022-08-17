import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes,  Route} from 'react-router-dom';

import App from './App'
import PagePv from './components/PagePv';
import PageWind from './components/PageWind';
import PageBiomass from './components/PageBiomass';
import PageWater from './components/PageWater';

//import './index.css'
import 'bulma/css/bulma.min.css';

const baseUrl = import.meta.env.BASE_URL as string;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter basename={baseUrl}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<PagePv />} />
          <Route path="wind" element={<PageWind />} />
          <Route path="biomass" element={<PageBiomass />} />
          <Route path="water" element={<PageWater />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
