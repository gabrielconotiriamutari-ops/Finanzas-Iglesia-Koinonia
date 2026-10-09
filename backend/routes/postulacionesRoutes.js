const express = require('express');
const router = express.Router();
const PostulacionesController = require('../controllers/postulacionesController');

// POST /api/postulaciones
router.post('/', PostulacionesController.crear);

module.exports = router;
