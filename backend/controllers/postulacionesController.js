const PostulacionModel = require('../models/postulacionModel');

// Implementación OOHDM -> registra la postulación enviada desde el Formulario
const PostulacionesController = {
  async crear(req, res) {
    const { mascota_id, nombre_postulante, email, telefono, motivo } = req.body;

    if (!mascota_id || !nombre_postulante || !email) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    try {
      const postulacion = await PostulacionModel.crear({
        mascota_id,
        nombre_postulante,
        email,
        telefono,
        motivo,
      });
      res.status(201).json(postulacion);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error de servidor' });
    }
  },
};

module.exports = PostulacionesController;
