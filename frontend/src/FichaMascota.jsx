import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

// Nodo Navegacional "FichaMascota": resuelve el contexto de una Mascota puntual
export function FichaMascota() {
  const { id } = useParams();
  const [mascota, setMascota] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/mascotas/${id}`)
      .then(res => res.json())
      .then(data => setMascota(data));
  }, [id]);

  if (!mascota) return <div className="cargando">Cargando ficha de la mascota...</div>;

  return (
    // Interfaz Abstracta: maquetación declarativa de la ficha
    <div className="ficha-card">
      <div className="ficha-imagen">
        <img src={mascota.imagen_url} alt={mascota.nombre} />
      </div>

      <div className="ficha-info">
        <h1>{mascota.nombre}</h1>

        <dl className="ficha-datos">
          <div className="ficha-dato">
            <dt>Especie</dt>
            <dd>{mascota.especie}</dd>
          </div>
          <div className="ficha-dato">
            <dt>Raza</dt>
            <dd>{mascota.raza}</dd>
          </div>
          <div className="ficha-dato">
            <dt>Edad</dt>
            <dd>{mascota.edad} años</dd>
          </div>
        </dl>

        <p className="ficha-descripcion">{mascota.descripcion}</p>

        <span className="badge-disponible">Disponible para adopción</span>

        <div className="ficha-acciones">
          {/* Enlace Navegacional estructural: pasa el contexto de la mascota al formulario */}
          <Link to={`/mascotas/${id}/postular`} className="btn-primario">
            Postular para adoptar
          </Link>
          <Link to="/" className="btn-secundario">
            Volver al catálogo
          </Link>
        </div>
      </div>
    </div>
  );
}
