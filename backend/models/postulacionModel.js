const pool = require('../config/db');

// Diseño Conceptual OOHDM -> clase "Postulación" traducida a consultas SQL
const PostulacionModel = {
  async crear({ mascota_id, nombre_postulante, email, telefono, motivo }) {
    const [resultado] = await pool.query(
      `INSERT INTO postulaciones (mascota_id, nombre_postulante, email, telefono, motivo)
       VALUES (?, ?, ?, ?, ?)`,
      [mascota_id, nombre_postulante, email, telefono || null, motivo || null]
    );

    const [rows] = await pool.query('SELECT * FROM postulaciones WHERE id = ?', [
      resultado.insertId,
    ]);
    return rows[0];
  },
};

module.exports = PostulacionModel;
