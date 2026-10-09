const MascotaModel = require('../models/mascotaModel');

// Implementación OOHDM -> lógica del API que abastece los nodos navegacionales
const MascotasController = {
  // Nodo Navegacional "Catálogo"
  async listar(req, res) {
    try {
      const mascotas = await MascotaModel.listarDisponibles();
      res.json(mascotas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error de servidor' });
    }
  },

  // Nodo Navegacional "FichaMascota"
  async obtenerPorId(req, res) {
    const { id } = req.params;
    try {
      const mascota = await MascotaModel.obtenerPorId(id);
      if (!mascota) {
        return res.status(404).json({ error: 'Mascota no encontrada' });
      }
      res.json(mascota);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error de servidor' });
    }
  },
};

module.exports = MascotasController;
