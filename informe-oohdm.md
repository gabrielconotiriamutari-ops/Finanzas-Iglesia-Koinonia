# Guía Práctica OOHDM — Sistema de Adopción de Mascotas

**Materia:** Análisis y Diseño de Sistemas II
**Metodología:** OOHDM (Object-Oriented Hypermedia Design Method)
**Stack:** React + React Router · Express (Node.js) · MySQL/MariaDB (XAMPP)

## El reto real

Un centro de rescate animal digitaliza su catálogo. Los usuarios navegan por las
fichas de los animales disponibles y envían una postulación de adopción que
interactúa directamente con el servidor.

El flujo hipermedia central es:

```
Catálogo de mascotas → Ficha de mascota → Formulario de postulación → Registro en MySQL/MariaDB (XAMPP)
```

---

## Fase 1 — Diseño Conceptual

### Qué resuelve esta fase

El Diseño Conceptual de OOHDM se enfoca en modelar el **dominio de la
aplicación** de forma independiente de la navegación o de la interfaz: se
identifican las clases conceptuales, sus atributos y las relaciones entre
ellas, tal como se haría en un modelo entidad-relación clásico.

### Relación con la tecnología: MySQL/MariaDB (XAMPP)

En el stack propuesto, esta fase se traduce directamente en el **esquema
relacional de MySQL/MariaDB, administrado con XAMPP**. Cada clase conceptual del dominio (Mascota,
Postulación) se convierte en una tabla, sus atributos en columnas, y las
relaciones en claves foráneas.

```sql
-- schema.sql (MySQL/MariaDB, importado desde phpMyAdmin en XAMPP)

CREATE TABLE mascotas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    especie VARCHAR(50) NOT NULL,      -- Perro, Gato, etc.
    raza VARCHAR(100),
    edad INT,
    descripcion TEXT,
    estado VARCHAR(20) DEFAULT 'disponible', -- disponible | en_proceso | adoptado
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
    FOREIGN KEY (mascota_id) REFERENCES mascotas(id)
) ENGINE=InnoDB;
```

**Ejemplo concreto:** la clase conceptual `Mascota` (con atributos nombre,
especie, raza, edad) y la clase `Postulación` (asociada 1 a N con `Mascota`,
porque una mascota puede recibir varias postulaciones) son exactamente las
entidades que un analista dibujaría en un diagrama de clases OOHDM antes de
tocar una sola línea de código de interfaz.

---

## Fase 2 — Diseño Navegacional

### Qué resuelve esta fase

OOHDM separa explícitamente el modelo conceptual del **modelo de navegación**:
aquí se definen los "nodos" (vistas navegables derivadas de las clases
conceptuales), los "enlaces" entre nodos, y las estructuras de acceso
(índices, catálogos). El objetivo es responder "¿cómo se mueve el usuario por
la información?", no "¿qué información existe?".

### Relación con la tecnología: React Router

En el stack, el modelo navegacional se implementa con las **rutas dinámicas
de React Router**. Cada nodo navegacional corresponde a una ruta; cada enlace
navegacional corresponde a un componente `<Link>` o a una llamada de
`navigate()`.

```
/                        → Nodo "Catálogo"  (clase de acceso: lista de Mascota)
/mascotas/:id            → Nodo "FichaMascota" (contexto: una Mascota)
/mascotas/:id/postular   → Nodo "FormularioPostulacion" (contexto: Postulación de esa Mascota)
```

**Ejemplo concreto:** el nodo `FichaMascota` no es la tabla `mascotas`
completa — es una **vista navegable** de un registro específico, resuelta por
el parámetro `:id` de la URL (igual que `PerfilMedico` en el caso de
telemedicina). El enlace "Postular para adopción" dentro de esa ficha es un
enlace navegacional estructural: lleva al usuario del nodo Ficha al nodo
Formulario, conservando el contexto (`mascotaId`) sin que el usuario tenga que
volver a elegir la mascota.

---

## Fase 3 — Interfaz Abstracta

### Qué resuelve esta fase

La Interfaz Abstracta especifica **cómo se perciben y activan** los objetos
navegacionales — qué se muestra, qué widgets se usan (botón, formulario,
tarjeta, imagen) — pero todavía de forma independiente de la tecnología final
de presentación. Es el puente entre "qué existe para navegar" (fase 2) y "qué
pinta la pantalla" (fase 4).

### Relación con la tecnología: React (componentes JSX)

Esta fase se materializa en los **componentes de presentación de React**: cada
nodo navegacional se renderiza mediante un componente JSX que declara de forma
visual y declarativa sus elementos de interfaz (tarjetas, botones,
formularios), sin mezclar esa declaración con la lógica de red.

**Ejemplo concreto:** la tarjeta de una mascota en el catálogo se define de
forma abstracta como "una imagen + un nombre + un botón de activación hacia la
ficha". En JSX eso es:

```jsx
<div className="mascota-card">
  <img src={mascota.imagen_url} alt={mascota.nombre} />
  <h3>{mascota.nombre}</h3>
  <p>{mascota.especie} — {mascota.raza}</p>
  <Link to={`/mascotas/${mascota.id}`} className="btn-link">Ver ficha</Link>
</div>
```

El `<Link>` es, en términos de OOHDM, la **activación de un enlace
navegacional** representada como un elemento de interfaz abstracta (un botón),
igual que el botón "Agendar Cita Médica" del caso de telemedicina.

---

## Fase 4 — Implementación

### Qué resuelve esta fase

La Implementación conecta todo lo anterior con la tecnología concreta: aquí se
programa la lógica real de acceso a datos, el transporte entre cliente y
servidor, y el consumo de esos datos desde la interfaz ya diseñada.

### Relación con la tecnología: Express (API REST) + fetch en React

En el stack, esta fase corresponde al **API REST construido con Express**
(que traduce peticiones HTTP en consultas SQL contra MySQL/MariaDB) y al
**consumo de esa API desde React** mediante `fetch`/`useEffect`.

**Ejemplo concreto:** el nodo `FichaMascota` (fase 2) necesita datos reales
para poblar su interfaz abstracta (fase 3). Eso solo existe gracias a la
implementación: el endpoint `GET /api/mascotas/:id` en Express consulta
MySQL/MariaDB y el componente React lo consume con `fetch` dentro de un
`useEffect`, igual que `PerfilMedico.jsx` en el ejemplo de telemedicina.

En esta versión del proyecto, la Implementación está además organizada en
capas dentro de `backend/`: `config/db.js` (conexión al pool de MySQL),
`models/` (consultas SQL de `Mascota` y `Postulación`), `controllers/`
(lógica de cada endpoint) y `routes/` (mapeo de rutas HTTP a controladores).
`server.js` solo monta esas rutas — la separación en capas es también una
forma de implementación de la misma decisión conceptual/navegacional ya
tomada en las fases 1 y 2.

---

## Respuestas al mapeo de fases (resumen técnico)

| Fase OOHDM            | Tecnología del stack        | Rol concreto en el sistema de adopción                                  |
|------------------------|------------------------------|----------------------------------------------------------------------|
| Diseño Conceptual       | MySQL/MariaDB (XAMPP)       | Tablas `mascotas` y `postulaciones` con su relación 1:N                |
| Diseño Navegacional     | React Router                | Rutas `/`, `/mascotas/:id`, `/mascotas/:id/postular`                    |
| Interfaz Abstracta      | Componentes JSX de React     | Tarjetas de mascota, ficha, formulario, botones de enlace navegacional  |
| Implementación          | Express + fetch en React     | Endpoints REST que leen/escriben en MySQL/MariaDB y son consumidos por React |

Este mapeo demuestra el principio central de OOHDM: **separar qué existe
(conceptual), cómo se navega (navegacional), cómo se percibe (interfaz
abstracta) y cómo se implementa (implementación)** son cuatro decisiones de
diseño independientes, aunque terminen resolviéndose con las mismas
tres piezas de tecnología (MySQL/MariaDB, Express, React).

---

## Ejemplo funcional del sistema

Ver carpetas `backend/` (Express + MySQL/MariaDB) y `frontend/src/` (React +
React Router). El flujo implementado es exactamente:

**Catálogo de mascotas → Ficha de mascota → Formulario de postulación →
Registro de postulación en MySQL/MariaDB (XAMPP)**
