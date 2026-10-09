-- Diseño Conceptual OOHDM -> esquema relacional en MySQL/MariaDB (XAMPP)
-- Importar desde phpMyAdmin o con: mysql -u root -p adopcion_mascotas_db < schema.sql

CREATE DATABASE IF NOT EXISTS adopcion_mascotas_db
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE adopcion_mascotas_db;

CREATE TABLE mascotas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    especie VARCHAR(50) NOT NULL,
    raza VARCHAR(100),
    edad INT,
    descripcion TEXT,
    estado VARCHAR(20) DEFAULT 'disponible',
    imagen_url TEXT
) ENGINE=InnoDB;

CREATE TABLE postulaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mascota_id INT NOT NULL,
    nombre_postulante VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    telefono VARCHAR(30),
    motivo TEXT,
    fecha_postulacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_postulacion_mascota
        FOREIGN KEY (mascota_id) REFERENCES mascotas(id)
) ENGINE=InnoDB;

-- Datos de ejemplo para probar el catálogo
INSERT INTO mascotas (nombre, especie, raza, edad, descripcion, imagen_url) VALUES
('Firulais', 'Perro', 'Mestizo', 2, 'Muy juguetón y sociable con niños.', 'https://placedog.net/400?id=1'),
('Michi', 'Gato', 'Común europeo', 1, 'Tranquilo, le gusta dormir al sol.', 'https://placekitten.com/400/300'),
('Rocky', 'Perro', 'Labrador', 4, 'Guardián y muy leal, ya sabe sentarse.', 'https://placedog.net/400?id=2');
