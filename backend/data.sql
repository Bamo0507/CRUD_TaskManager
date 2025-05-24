-- ----------------------------------------
-- Proyectos (10 registros)
-- ----------------------------------------
INSERT INTO public.proyecto (nombre) VALUES
('Introducción a la Programación'),
('Estructuras de Datos'),
('Bases de Datos'),
('Algoritmos Avanzados'),
('Sistemas Operativos'),
('Redes de Computadoras'),
('Inteligencia Artificial'),
('Desarrollo Web'),
('Seguridad Informática'),
('Computación Gráfica');

-- ----------------------------------------
-- Prioridades (3 registros)
-- ----------------------------------------
INSERT INTO public.prioridad (nivel) VALUES
('Baja'),
('Media'),
('Alta');

-- ----------------------------------------
-- Etiquetas (15 registros)
-- ----------------------------------------
INSERT INTO public.etiqueta (nombre) VALUES
('Urgente'),
('Bloqueado'),
('En espera'),
('Investigación'),
('Revisión'),
('Documentación'),
('Testing'),
('Meeting'),
('Cliente'),
('Refactor'),
('Deploy'),
('Bug'),
('Feature'),
('Optimización'),
('Planificación');

-- ----------------------------------------
-- Actividades (12 registros)
-- ----------------------------------------
INSERT INTO public.actividad (nombre, dificultad, "proyectoId", "prioridadId") VALUES
('Instalar entorno de desarrollo', 5, 1, 2),
('Diseñar diagrama de clases', 20, 2, 3),
('Modelar esquema de base de datos', 30, 3, 2),
('Implementar heap sort', 40, 4, 1),
('Gestionar hilos y mutex', 50, 5, 3),
('Configurar servidor de pruebas', 15, 6, 2),
('Entrenar modelo de regresión', 60, 7, 3),
('Crear API REST', 25, 8, 2),
('Auditoría de seguridad', 70, 9, 3),
('Renderizar escena 3D', 55, 10, 1),
('Escribir casos de prueba unitarios', 35, 3, 2),
('Revisión de código peer-to-peer', 45, 8, 2);

-- ----------------------------------------
-- Relaciones Actividad ↔ Etiqueta (24 registros)
-- 2 etiquetas asignadas a cada actividad
-- ----------------------------------------
INSERT INTO public.actividad_etiquetas ("actividadId", "etiquetaId") VALUES
(1, 1),(1, 6),
(2, 4),(2, 5),
(3, 3),(3, 6),
(4, 11),(4, 14),
(5, 2),(5, 15),
(6, 8),(6, 12),
(7, 4),(7, 13),
(8, 11),(8, 7),
(9, 9),(9, 12),
(10, 6),(10, 14),
(11, 7),(11, 5),
(12, 5),(12, 10);

