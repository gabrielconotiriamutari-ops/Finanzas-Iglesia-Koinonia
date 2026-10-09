const express = require('express');
const router = express.Router();
const MascotasController = require('../controllers/mascotasController');

// GET /api/mascotas
router.get('/', MascotasController.listar);

// GET /api/mascotas/:id
router.get('/:id', MascotasController.obtenerPorId);

module.exports = router;
