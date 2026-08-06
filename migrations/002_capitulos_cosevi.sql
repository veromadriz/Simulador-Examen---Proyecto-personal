-- Capítulos del resumen RCV / Manual teórico COSEVI.
-- Es seguro ejecutarlo más de una vez. Conserva las secciones que ya existan.

CREATE UNIQUE INDEX IF NOT EXISTS idx_manual_capitulos_numero_unico
    ON manual_capitulos (numero);

INSERT INTO manual_capitulos (numero, titulo, descripcion, icono)
VALUES
    (1, 'Aspectos generales del tránsito y la seguridad vial', 'Conceptos básicos del tránsito, seguridad vial y la trilogía vial.', '🚦'),
    (2, 'Legislación de tránsito', 'Derechos, requisitos, sanciones y normas de la Ley de Tránsito.', '⚖️'),
    (3, 'Factor vía y su entorno', 'La vía pública, su diseño y las condiciones del entorno.', '🛣️'),
    (4, 'Factor vehículo', 'Componentes, requisitos y condiciones seguras del vehículo.', '🚗'),
    (5, 'Factor humano', 'Responsabilidad, capacidades y conducta de las personas usuarias.', '🧑'),
    (6, 'Normas de circulación', 'Reglas para peatones, conductores y una circulación segura.', '🚸'),
    (7, 'Rotondas', 'Cómo ingresar, circular y salir correctamente de una rotonda.', '🔄'),
    (8, 'El conductor y la contaminación ambiental', 'Efectos ambientales y prácticas responsables de conducción.', '🌿'),
    (9, 'La conducción técnica económica eficiente', 'Técnicas de eco-conducción, ahorro de combustible y eficiencia.', '⛽')
    
ON CONFLICT (numero) DO UPDATE SET
    titulo = EXCLUDED.titulo,
    descripcion = EXCLUDED.descripcion,
    icono = EXCLUDED.icono;

-- Relación que hace que un examen por capítulo solo devuelva preguntas de
-- ese capítulo. Ejecutá los UPDATE de asignación según tu banco de preguntas.
ALTER TABLE preguntas
    ADD COLUMN IF NOT EXISTS capitulo_id INTEGER REFERENCES manual_capitulos(id);

CREATE INDEX IF NOT EXISTS idx_preguntas_capitulo_id
    ON preguntas (capitulo_id);

-- Ejemplos de asignación (adaptalos al contenido real de tus preguntas):
-- UPDATE preguntas SET capitulo_id = (SELECT id FROM manual_capitulos WHERE numero = 1)
-- WHERE enunciado ILIKE '%seguridad vial%';
-- UPDATE preguntas SET capitulo_id = (SELECT id FROM manual_capitulos WHERE numero = 2)
-- WHERE enunciado ILIKE '%multa%' OR enunciado ILIKE '%ley%';
-- UPDATE preguntas SET capitulo_id = (SELECT id FROM manual_capitulos WHERE numero = 7)
-- WHERE enunciado ILIKE '%rotonda%';
