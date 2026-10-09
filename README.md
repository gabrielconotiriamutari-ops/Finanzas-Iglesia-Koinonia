# Sistema de Adopción de Mascotas — OOHDM (React + Express + MySQL/MariaDB en XAMPP)

Proyecto de la materia **Análisis y Diseño de Sistemas II**, desarrollado
siguiendo la metodología **OOHDM** (Diseño Conceptual, Diseño Navegacional,
Interfaz Abstracta e Implementación).

La explicación completa de las cuatro fases está en `informe-oohdm.md`, en la
raíz de este proyecto.

Flujo implementado:

```
Catálogo de mascotas → Ficha de mascota → Formulario de postulación → Registro en MySQL/MariaDB (XAMPP)
```

Este proyecto usa el **MySQL/MariaDB que trae XAMPP** (puerto 3306) como
base de datos. **Express/Node.js sigue siendo el backend y expone la API
REST** — XAMPP se usa únicamente para el servidor de MySQL/MariaDB y
phpMyAdmin, no para servir PHP; no se reemplaza Express por PHP en ningún
punto.

## Estructura del proyecto

```
adopcion-mascotas/
├── informe-oohdm.md              ← explicación de las 4 fases OOHDM
├── backend/
│   ├── server.js                 ← punto de entrada de Express (monta las rutas)
│   ├── config/
│   │   └── db.js                 ← conexión (pool) a MySQL/MariaDB de XAMPP
│   ├── models/
│   │   ├── mascotaModel.js       ← consultas SQL de Mascota
│   │   └── postulacionModel.js   ← consultas SQL de Postulación
│   ├── controllers/
│   │   ├── mascotasController.js
│   │   └── postulacionesController.js
│   ├── routes/
│   │   ├── mascotasRoutes.js
│   │   └── postulacionesRoutes.js
│   ├── schema.sql                ← Diseño Conceptual (tablas MySQL/MariaDB)
│   ├── package.json
│   └── .env.example
└── frontend/
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── src/
        ├── main.jsx
        ├── App.jsx                  ← Diseño Navegacional (rutas)
        ├── styles.css                ← Interfaz Abstracta (estilos)
        ├── CatalogoMascotas.jsx
        ├── FichaMascota.jsx
        └── FormularioPostulacion.jsx
```

## Requisitos previos

- [XAMPP](https://www.apachefriends.org/) instalado (usa su módulo MySQL,
  con MariaDB por debajo)
- Node.js 18 o superior

## 1. Iniciar XAMPP

1. Abre el **Panel de Control de XAMPP**.
2. Inicia el módulo **MySQL** (no hace falta iniciar Apache, salvo que
   quieras usar phpMyAdmin desde el navegador, que sí depende de Apache).
3. Confirma que MySQL quedó escuchando en el puerto **3306** (puerto por
   defecto de XAMPP; no lo cambies).

## 2. Crear/importar la base de datos en phpMyAdmin

1. Con Apache y MySQL corriendo, abre `http://localhost/phpmyadmin` en el
   navegador.
2. Ve a la pestaña **"Importar"**.
3. Selecciona el archivo `backend/schema.sql` de este proyecto y haz clic en
   **"Continuar" / "Importar"**.
4. Esto crea automáticamente la base de datos `adopcion_mascotas_db`, sus
   tablas `mascotas` y `postulaciones`, y precarga 3 mascotas de ejemplo.

   Alternativa por línea de comandos (con el MySQL de XAMPP en el PATH):

   ```bash
   mysql -u root -P 3306 -h localhost < backend/schema.sql
   ```

## 3. Configurar y ejecutar el backend (Express)

```bash
cd backend
npm install
cp .env.example .env
```

Por defecto, XAMPP usa el usuario `root` **sin contraseña** en el puerto
`3306`, que es justo lo que trae `.env.example`. Si tu instalación de XAMPP
tiene una contraseña distinta para `root`, ajústala en `.env`.

Luego inicia el servidor:

```bash
npm run start
```

Deberías ver en consola: `API de Adopción de Mascotas corriendo en el puerto 5000`

## 4. Configurar y ejecutar el frontend (React)

En otra terminal (deja el backend corriendo):

```bash
cd frontend
npm install
npm run dev
```

Vite mostrará una URL local, normalmente `http://localhost:3000`. Ábrela en
el navegador.

## 5. Probar la API directamente

Con el backend corriendo, puedes probar los endpoints reales del proyecto
desde el navegador, Postman o `curl`:

| Endpoint                                  | Método | Qué hace                                      |
|--------------------------------------------|--------|------------------------------------------------|
| `http://localhost:5000/`                   | GET    | Verifica que la API está corriendo             |
| `http://localhost:5000/api/mascotas`       | GET    | Lista el catálogo de mascotas disponibles      |
| `http://localhost:5000/api/mascotas/1`     | GET    | Ficha de la mascota con id 1                   |
| `http://localhost:5000/api/postulaciones`  | POST   | Registra una postulación (body JSON, ver abajo)|

Ejemplo de body para probar el `POST` con `curl`:

```bash
curl -X POST http://localhost:5000/api/postulaciones \
  -H "Content-Type: application/json" \
  -d '{"mascota_id":1,"nombre_postulante":"Ana Pérez","email":"ana@example.com","telefono":"70000000","motivo":"Tengo espacio y experiencia con perros."}'
```

## 6. Probar el flujo completo desde el navegador

1. La página inicial (`http://localhost:3000`) muestra el **catálogo** de
   mascotas, obtenido de `GET /api/mascotas`.
2. Haz clic en "Ver ficha" para entrar a la **ficha** de una mascota
   (`GET /api/mascotas/:id`).
3. Haz clic en "Postular para adopción" para ir al **formulario**.
4. Completa el formulario y envíalo: se dispara un `POST /api/postulaciones`
   y la postulación queda registrada en la tabla `postulaciones` de MySQL.

Puedes verificarlo en phpMyAdmin (tabla `postulaciones`) o con:

```bash
mysql -u root -P 3306 -h localhost -e "SELECT * FROM adopcion_mascotas_db.postulaciones;"
```

## Notas

- El proyecto está pensado para abrirse directamente en Visual Studio Code:
  abre la carpeta `adopcion-mascotas` completa y usa dos terminales integradas
  (una para `backend`, otra para `frontend`).
- El backend (Express) corre en el puerto `5000`, el frontend (Vite) en el
  `3000`, y MySQL/MariaDB de XAMPP en el `3306` — ninguno de los puertos de
  XAMPP se modifica.
- CORS ya está habilitado en `server.js` para permitir la comunicación entre
  React y Express.
