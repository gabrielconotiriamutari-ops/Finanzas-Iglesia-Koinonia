const pool = require('../config/db');

// Diseño Conceptual OOHDM -> clase "Mascota" traducida a consultas SQL
const MascotaModel = {
  async listarDisponibles() {
    const [rows] = await pool.query(
      'SELECT * FROM mascotas WHERE estado = ? ORDER BY id',
      ['disponible']
    );
    return rows;
  },

  async obtenerPorId(id) {
    const [rows] = await pool.query('SELECT * FROM mascotas WHERE id = ?', [id]);
    return rows[0] || null;
  },
};

module.exports = MascotaModel;
