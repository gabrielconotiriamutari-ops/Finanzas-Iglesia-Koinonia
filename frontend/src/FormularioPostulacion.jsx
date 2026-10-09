import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Nodo Navegacional "FormularioPostulacion": contexto = Postulación para una Mascota
export function FormularioPostulacion() {
  const { id } = useParams(); // id de la mascota, heredado del nodo anterior
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre_postulante: '',
    email: '',
    telefono: '',
    motivo: '',
  });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Implementación: envío de la postulación al API REST (POST -> MySQL/MariaDB)
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5000/api/postulaciones', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mascota_id: id, ...form }),
    });
    setEnviado(true);
    setTimeout(() => navigate('/'), 2000);
  };

  if (enviado) {
    return (
      <div className="mensaje-exito">
        <span className="mensaje-exito-icono" aria-hidden="true">🐾</span>
        <p>Postulación enviada correctamente. Gracias por considerar la adopción.</p>
      </div>
    );
  }

  return (
    // Interfaz Abstracta: formulario declarado en JSX
    <form className="postulacion-form" onSubmit={handleSubmit}>
      <h1 className="postulacion-titulo">Postular para adoptar</h1>

      <div className="campo">
        <label>Nombre completo</label>
        <input
          name="nombre_postulante"
          value={form.nombre_postulante}
          onChange={handleChange}
          required
        />
      </div>

      <div className="campo">
        <label>Correo electrónico</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="campo">
        <label>Teléfono</label>
        <input
          name="telefono"
          value={form.telefono}
          onChange={handleChange}
        />
      </div>

      <div className="campo">
        <label>Motivo de adopción</label>
        <textarea
          name="motivo"
          value={form.motivo}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn-primario">Enviar postulación</button>
    </form>
  );
}
