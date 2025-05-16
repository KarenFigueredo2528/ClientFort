# ClientGuard

## Descripción
ClientGuard es un sistema de gestión de clientes y tarjetas de crédito diseñado para permitir al administrador de la empresa realizar todas las operaciones necesarias. El sistema proporciona funcionalidades para registrar, visualizar, modificar y eliminar clientes, así como gestionar las tarjetas de crédito asociadas a cada cliente.

## Tecnologías Utilizadas
- Lenguaje de Backend: Java (Spring Boot)
- Lenguaje de Frontend: React (JavaScript)
- Base de Datos Relacional: MariaDB
- Base de Datos NoSQL: MongoDB (opcional)
- Sistema Operativo: Debian 12

## Instalación y Configuración
1. Clona este repositorio en tu máquina local:
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   ```
2. Configura la base de datos en MariaDB y aplica el script SQL proporcionado (ver sección "Script de Base de Datos").
3. Configura el backend (Spring Boot) y el frontend (React) de acuerdo a las instrucciones específicas.

## Uso del Sistema
- El administrador puede:
  - Registrar, visualizar, modificar y eliminar clientes.
  - Registrar, visualizar, modificar y eliminar tarjetas de crédito.

## Estructura del Proyecto
- `backend/` - Código fuente del backend en Spring Boot.
- `frontend/` - Código fuente del frontend en React.
- `db/` - Scripts de base de datos.

## Script de Base de Datos
```sql
CREATE DATABASE clientguard;
USE clientguard;

CREATE TABLE clientes (
    id_cliente INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    estado ENUM('ACTIVO', 'INACTIVO') DEFAULT 'ACTIVO'
);

CREATE TABLE tarjetas (
    id_tarjeta INT PRIMARY KEY AUTO_INCREMENT,
    numero_tarjeta VARCHAR(16) UNIQUE NOT NULL,
    fecha_vencimiento VARCHAR(7) NOT NULL,
    franquicia VARCHAR(20),
    estado ENUM('ACTIVO', 'INACTIVO') DEFAULT 'ACTIVO',
    cupo_total DECIMAL(10,2) NOT NULL,
    cupo_disponible DECIMAL(10,2) NOT NULL,
    cupo_utilizado DECIMAL(10,2) AS (cupo_total - cupo_disponible),
    id_cliente INT,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
);
```

## Licencia
Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.
