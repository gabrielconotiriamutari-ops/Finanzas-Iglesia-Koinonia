import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { CatalogoMascotas } from './CatalogoMascotas';
import { FichaMascota } from './FichaMascota';
import { FormularioPostulacion } from './FormularioPostulacion';

// Diseño Navegacional OOHDM -> rutas de React Router
export default function App() {
  return (
    <BrowserRouter>
      <header className="app-header">
        <Link to="/" className="app-header-link">
          <span className="app-header-icon" aria-hidden="true">🐾</span>
          <span className="app-header-title">Adopta una Mascota</span>
        </Link>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<CatalogoMascotas />} />
          <Route path="/mascotas/:id" element={<FichaMascota />} />
          <Route path="/mascotas/:id/postular" element={<FormularioPostulacion />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
