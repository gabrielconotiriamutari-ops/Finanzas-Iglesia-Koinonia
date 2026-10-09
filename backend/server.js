require('dotenv').config();
const express = require('express');
const cors = require('cors');

const mascotasRoutes = require('./routes/mascotasRoutes');
const postulacionesRoutes = require('./routes/postulacionesRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Implementación OOHDM -> montaje del API REST (Express) sobre MySQL/MariaDB de XAMPP
app.use('/api/mascotas', mascotasRoutes);
app.use('/api/postulaciones', postulacionesRoutes);

// Ruta de comprobación rápida
app.get('/', (req, res) => {
  res.json({ mensaje: 'API de Adopción de Mascotas corriendo correctamente' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API de Adopción de Mascotas corriendo en el puerto ${PORT}`));
