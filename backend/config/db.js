const mysql = require('mysql2/promise');
require('dotenv').config();

// Conexión física (Diseño Conceptual -> MySQL/MariaDB de XAMPP)
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'adopcion_mascotas_db',
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;
