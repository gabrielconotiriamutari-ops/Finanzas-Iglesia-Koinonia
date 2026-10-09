import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Nodo Navegacional "Catálogo": clase de acceso a todas las mascotas
export function CatalogoMascotas() {
  const [mascotas, setMascotas] = useState([]);

  useEffect(() => {
    // Implementación: consumo asíncrono de la API
    fetch('http://localhost:5000/api/mascotas')
      .then(res => res.json())
      .then(data => setMascotas(data));
  }, []);

  return (
    <div className="catalogo">
      <h1 className="catalogo-titulo">Mascotas disponibles para adopción</h1>
      <div className="catalogo-grid">
        {mascotas.map(mascota => (
          // Interfaz Abstracta: tarjeta con imagen + nombre + enlace navegacional
          <div key={mascota.id} className="mascota-card">
            <div className="mascota-card-imagen">
              <img src={mascota.imagen_url} alt={mascota.nombre} />
            </div>
            <div className="mascota-card-info">
              <h3>{mascota.nombre}</h3>
              <p className="mascota-card-detalle">{mascota.especie} — {mascota.raza}</p>
              <Link to={`/mascotas/${mascota.id}`} className="btn-primario">
                Ver ficha
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
