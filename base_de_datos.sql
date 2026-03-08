CREATE DATABASE crud_v3;
USE crud_v3;

-- La tabla usuarios
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre CHAR(50) NOT NULL,
    apellidos CHAR(100) NOT NULL,
    dni CHAR(8) NOT NULL,
    direccion CHAR(150) NOT NULL,
    telefono CHAR(20) NOT NULL,
    correo CHAR(100) NOT NULL,
    categoria CHAR(50) NOT NULL,
    estado ENUM('Activo','Inactivo','Pendiente')
    NOT NULL DEFAULT 'Activo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP
);

-- Procedimientos Almacenados
DELIMITER //
-- Obtener todos los usuarios
CREATE PROCEDURE GetUsers()
BEGIN
    SELECT id, nombre, apellidos, dni, direccion, telefono, correo,
           categoria, estado, created_at, updated_at
    FROM users;
END //

-- Insertar usuario
CREATE PROCEDURE InsertUser(
    IN p_nombre CHAR(50),
    IN p_apellidos CHAR(100),
    IN p_dni CHAR(8),
    IN p_direccion CHAR(150),
    IN p_telefono CHAR(20),
    IN p_correo CHAR(100),
    IN p_categoria CHAR(50),
    IN p_estado ENUM('Activo','Inactivo','Pendiente')
)
BEGIN
    INSERT users(
        nombre, apellidos, dni, direccion,
        telefono, correo, categoria, estado
    )
    VALUES(
        p_nombre, p_apellidos, p_dni, p_direccion,
        p_telefono, p_correo, p_categoria, p_estado
    );
END //

-- Actualizar Usuario
CREATE PROCEDURE UpdateUser(
    IN p_id INT,
    IN p_nombre CHAR(50),
    IN p_apellidos CHAR(100),
    IN p_dni CHAR(8),
    IN p_direccion CHAR(150),
    IN p_telefono CHAR(20),
    IN p_correo CHAR(100),
    IN p_categoria CHAR(50),
    IN p_estado ENUM('Activo','Inactivo','Pendiente')
)
BEGIN
    UPDATE users
    SET nombre = p_nombre,
        apellidos = p_apellidos,
        dni = p_dni,
        direccion = p_direccion,
        telefono = p_telefono,
        correo = p_correo,
        categoria = p_categoria,
        estado = p_estado
    WHERE id = p_id;
END //

-- Eliminar Usuario
CREATE PROCEDURE DeleteUser(IN p_id INT)
BEGIN
    DELETE FROM users WHERE id = p_id;
END //

-- Procedimientos para el Dashboard

-- Total de Registros
CREATE PROCEDURE GetTotalUsers()
BEGIN
    SELECT COUNT(*) AS total FROM users;
END //

-- Total por estado
CREATE PROCEDURE GetUsersByEstado()
BEGIN
    SELECT estado, COUNT(*) AS total
    FROM users
    GROUP BY estado;
END //

-- Total por categoria
CREATE PROCEDURE GetUsersByCategoria()
BEGIN
    SELECT categoria, COUNT(*) AS total
    FROM users
    GROUP BY categoria;
END //

-- Ultimo usuario insertado
CREATE PROCEDURE GetLastInserted()
BEGIN
    SELECT *
    FROM users
    ORDER BY created_at DESC
    LIMIT 1;
END //

-- Ultimo usuario actualizado
CREATE PROCEDURE GetLastUpdated()
BEGIN
    SELECT *
    FROM users
    WHERE updated_at > created_at
    ORDER BY updated_at DESC
    LIMIT 1;
END //

DELIMITER ;

INSERT users (nombre, apellidos, dni, direccion, telefono, correo, categoria, estado) VALUES
('Juan', 'Pérez García', '71234567', 'Av. Larco 123', '987654321', 'juan.perez@email.com', 'Admin', 'Activo'),
('María', 'Rodríguez López', '45678912', 'Calle Las Flores 456', '912345678', 'maria.rod@email.com', 'Editor', 'Activo'),
('Carlos', 'Sánchez Ruiz', '12345678', 'Jr. Puno 789', '933445566', 'carlos.s@email.com', 'Moderador', 'Inactivo'),
('Ana', 'Torres Vila', '87654321', 'Av. Arequipa 1500', '955667788', 'ana.torres@email.com', 'Soporte', 'Pendiente'),
('Luis', 'Mendoza Castro', '23456789', 'Calle Los Pinos 222', '966778899', 'luis.m@email.com', 'Admin', 'Activo'),
('Elena', 'Ramos Soler', '34567890', 'Av. Javier Prado 3000', '977889900', 'elena.r@email.com', 'Editor', 'Activo'),
('Ricardo', 'Vargas Luna', '45678901', 'Jr. Cusco 123', '988990011', 'ricardo.v@email.com', 'Moderador', 'Inactivo'),
('Sofía', 'Herrera Díaz', '56789012', 'Av. Brasil 2500', '999001122', 'sofia.h@email.com', 'Soporte', 'Pendiente'),
('Diego', 'Castillo Oro', '67890123', 'Calle Los Álamos 444', '911223344', 'diego.c@email.com', 'Admin', 'Activo'),
('Lucía', 'Paredes Paz', '78901234', 'Av. El Sol 567', '922334455', 'lucia.p@email.com', 'Editor', 'Activo'),
('Gabriel', 'Rojas Soto', '89012345', 'Jr. Libertad 888', '933445577', 'gabriel.r@email.com', 'Moderador', 'Inactivo'),
('Valeria', 'Mejía Tello', '90123456', 'Av. Universitaria 1010', '944556688', 'valeria.m@email.com', 'Soporte', 'Activo');