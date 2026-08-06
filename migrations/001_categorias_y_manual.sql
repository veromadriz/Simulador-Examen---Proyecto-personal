-- Migración 001: filtro de exámenes por categoría/capítulo + tablas del Manual
-- Es segura de correr varias veces (usa IF NOT EXISTS en todos lados).
-- Ejecutar en el SQL Editor de Supabase.

-- 1) Categoría de cada pregunta (para "Practicar por categoría").
--    Si tus preguntas hoy no tienen categoría, quedan en NULL y el examen
--    "aleatorio"/"diagnóstico"/"extremo" las sigue usando con normalidad;
--    solo "Por categoría" filtra por esta columna.
ALTER TABLE preguntas
    ADD COLUMN IF NOT EXISTS categoria TEXT;

CREATE INDEX IF NOT EXISTS idx_preguntas_categoria ON preguntas (categoria);

-- 2) Capítulos y secciones del Manual del Conductor (para /manual como
--    mini-app de páginas propias, en vez de contenido fijo hardcodeado).
CREATE TABLE IF NOT EXISTS manual_capitulos (
    id SERIAL PRIMARY KEY,
    numero INTEGER NOT NULL,
    titulo TEXT NOT NULL,
    descripcion TEXT,
    icono TEXT
);

CREATE TABLE IF NOT EXISTS manual_secciones (
    id SERIAL PRIMARY KEY,
    capitulo_id INTEGER NOT NULL REFERENCES manual_capitulos(id) ON DELETE CASCADE,
    orden INTEGER NOT NULL DEFAULT 0,
    subtitulo TEXT,
    contenido TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_manual_secciones_capitulo ON manual_secciones (capitulo_id);

-- 2.1) Cada pregunta pertenece opcionalmente a un capítulo del manual.
--      Los exámenes "Por capítulo" usan esta relación, no la categoría de
--      texto libre, para garantizar que no se mezclen temas.
ALTER TABLE preguntas
    ADD COLUMN IF NOT EXISTS capitulo_id INTEGER REFERENCES manual_capitulos(id);

CREATE INDEX IF NOT EXISTS idx_preguntas_capitulo_id ON preguntas (capitulo_id);

-- 3) Datos de ejemplo para poder probar el Manual de inmediato.
--    Bórralos o cámbialos por el contenido real cuando quieras.
INSERT INTO manual_capitulos (numero, titulo, descripcion, icono)
SELECT 1, 'Señales de tránsito', 'Alto, ceda, prevención e información.', '🚧'
WHERE NOT EXISTS (SELECT 1 FROM manual_capitulos WHERE numero = 1);

INSERT INTO manual_capitulos (numero, titulo, descripcion, icono)
SELECT 2, 'Reglas de circulación', 'Prioridades, límites de velocidad y adelantamiento.', '🛣️'
WHERE NOT EXISTS (SELECT 1 FROM manual_capitulos WHERE numero = 2);

INSERT INTO manual_capitulos (numero, titulo, descripcion, icono)
SELECT 3, 'Seguridad vial', 'Cinturón, distancias y buenas prácticas al conducir.', '🛡️'
WHERE NOT EXISTS (SELECT 1 FROM manual_capitulos WHERE numero = 3);

INSERT INTO manual_secciones (capitulo_id, orden, subtitulo, contenido)
SELECT c.id, 1, 'La señal de Alto', 'Debes detener completamente el vehículo antes de la línea de pare y ceder el paso antes de continuar.'
FROM manual_capitulos c
WHERE c.numero = 1
  AND NOT EXISTS (SELECT 1 FROM manual_secciones s WHERE s.capitulo_id = c.id AND s.orden = 1);

INSERT INTO manual_secciones (capitulo_id, orden, subtitulo, contenido)
SELECT c.id, 1, 'Prioridad de paso', 'En una intersección sin señalización, tiene prioridad el vehículo que llega primero o el que viene por la derecha.'
FROM manual_capitulos c
WHERE c.numero = 2
  AND NOT EXISTS (SELECT 1 FROM manual_secciones s WHERE s.capitulo_id = c.id AND s.orden = 1);

INSERT INTO manual_secciones (capitulo_id, orden, subtitulo, contenido)
SELECT c.id, 1, 'Distancia segura', 'Mantén al menos 3 segundos de distancia con el vehículo de adelante; más si llueve.'
FROM manual_capitulos c
WHERE c.numero = 3
  AND NOT EXISTS (SELECT 1 FROM manual_secciones s WHERE s.capitulo_id = c.id AND s.orden = 1);

-- 4) Asigná tus preguntas existentes al capítulo correcto. Adaptá estas
--    sugerencias a tu banco de preguntas antes de ejecutar los UPDATE:
-- UPDATE preguntas SET capitulo_id = (SELECT id FROM manual_capitulos WHERE numero = 1)
-- WHERE enunciado ILIKE '%señal%';
-- UPDATE preguntas SET capitulo_id = (SELECT id FROM manual_capitulos WHERE numero = 2)
-- WHERE enunciado ILIKE '%prioridad%' OR enunciado ILIKE '%velocidad%';
-- UPDATE preguntas SET capitulo_id = (SELECT id FROM manual_capitulos WHERE numero = 3)
-- WHERE enunciado ILIKE '%cinturón%' OR enunciado ILIKE '%distancia%';
