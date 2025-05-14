import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import OauthCallback from './pages/OauthCallback';
import './index.css';
import APP from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <APP/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/oauth-callback" element={<OauthCallback />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
