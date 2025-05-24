# ClientGuard

## Descripción
ClientGuard es un sistema de gestión de clientes y tarjetas de crédito diseñado para permitir al administrador de la empresa realizar todas las operaciones necesarias. El sistema proporciona funcionalidades para registrar, visualizar, modificar, eliminar clientes, así como gestionar las tarjetas de crédito asociadas a cada uno.

## Tecnologías Utilizadas

### Backend
- **Node.js** (con ES Modules)
- **Express.js** – Framework para la API REST
- **MySQL** / Workbench – Base de datos relacional
- **mysql2** – Cliente para conectarse a MySQL con soporte de Promesas
- **dotenv** – Manejo de variables de entorno
- **Vitest** – Framework para pruebas unitarias
- **Nodemon** – Recarga automática durante el desarrollo

### Frontend (no implementado aún)
- React (planeado, no en esta entrega)

### Herramientas de Prueba
- **Postman** – Pruebas de los endpoints
- **MySQL Workbench** – Verificación directa en base de datos

##Entorno de Desarrollo 
- **Visual Studio Code**

## Instalación y Configuración

1. Clona este repositorio:
   ```bash
   git clone git@github.com:KarenFigueredo2528/ClientFort.git
   cd ClientFort/backend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura el archivo `.env` en `backend/`:
   ```env
   MYSQL_HOST=localhost
   MYSQL_USER=root
   MYSQL_PASSWORD=tu_clave
   MYSQL_DATABASE=clientguard
   PORT=3000
   ```

4. Ejecuta el backend:
   ```bash
   npm run dev
   ```

## Pruebas Unitarias

Para ejecutar las pruebas unitarias:

```bash
node --experimental-vm-modules node_modules/jest/bin/jest.js
```


## 📬 Endpoints del API

### 🔹 Clientes
| Método | Ruta                          | Descripción                                      |
|--------|-------------------------------|--------------------------------------------------|
| `POST` | `/api/clientes/`              | Registrar un nuevo cliente                       |
| `GET`  | `/api/clientes/`              | Obtener todos los clientes                       |
| `GET`  | `/api/clientes/buscar`        | Buscar clientes por nombre, correo o identificación |

### 🔹 Tarjetas de Crédito
| Método | Ruta                                | Descripción                                      |
|--------|-------------------------------------|--------------------------------------------------|
| `POST` | `/api/tarjetas/`                    | Registrar una nueva tarjeta de crédito           |
| `GET`  | `/api/tarjetas/`                    | Obtener todas las tarjetas                       |
| `GET`  | `/api/tarjetas/buscar`              | Buscar tarjetas por número, franquicia o estado  |
| `GET`  | `/api/tarjetas/contar/:clienteId`   | Obtener cuántas tarjetas tiene un cliente        |
| `PUT`  | `/api/tarjetas/:id`                 | Modificar el cupo total de una tarjeta           |
| `DELETE`| `/api/tarjetas/:id`                | Eliminar lógicamente una tarjeta (cambia estado) |


## Script de Base de Datos

```sql
/*
Autor: Miguel Sánchez y Karen buitrago
Descripción: Se crean tablas con relación de Cliente y Tarjeta.
*/

-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS client_fort;
USE client_fort;

-- Tabla de clientes
CREATE TABLE cliente (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    numero_identificacion VARCHAR(20) NOT NULL UNIQUE,
    nombre_completo VARCHAR(100) NOT NULL,
    correo_electronico VARCHAR(100) NOT NULL
);

-- Tabla de tarjetas de crédito
CREATE TABLE tarjeta_credito (
    id INT AUTO_INCREMENT PRIMARY KEY,
    numero_tarjeta VARCHAR(20) NOT NULL UNIQUE,
    fecha_vencimiento VARCHAR(7) NOT NULL, -- Formato MM/YYYY
    franquicia ENUM('VISA', 'MASTERCARD', 'AMEX') NOT NULL,
    estado ENUM('ACTIVO', 'INACTIVO') DEFAULT 'ACTIVO',
    cupo_total DECIMAL(10, 2) NOT NULL,
    cupo_disponible DECIMAL(10, 2) NOT NULL,
    cupo_utilizado DECIMAL(10, 2) GENERATED ALWAYS AS (cupo_total - cupo_disponible) STORED,
    cliente_id INT NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id_cliente)
);
```

## Licencia

Este proyecto ha sido desarrollado con fines educativos.
