--- START OF FILE preguntas_cosevi_full.sql ---

-- Insert themes
INSERT INTO temas (nombre, descripcion) VALUES
('Basic concepts and road safety', 'Foundations of traffic, circulation and road safety'),
('Regulations and fines', 'Regulations, sanctions and legal obligations'),
('Speed limits', 'Maximum and minimum speeds allowed'),
('Traffic signs', 'Interpretation of vertical and horizontal signs'),
('Basic mechanics', 'Essential vehicle knowledge'),
('Defensive driving', 'Preventive driving techniques'),
('Right of way', 'Rules on who has the right of way'),
('Roundabouts', 'Rules of circulation and priority in roundabouts'),
('Environmental pollution', 'Environmental impact and emission control'),
('Efficient driving', 'Fuel saving techniques and efficient operation');

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The primary objective of road safety', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Increase penalties and sanctions', true, 1),
('Prevent traffic accidents', false, 1),
('Approve laws to eliminate accidents', false, 1);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('On rural roads, the pedestrian must walk along', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('The edge of the roadway', true, 2),
('The left side of the roadway', false, 2),
('The sidewalks', false, 2);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The first vehicle arrived in Costa Rica in', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('1920', true, 3),
('1921', false, 3),
('1912', false, 3);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The first traffic code was published in', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('1912', true, 4),
('1920', false, 4),
('1921', false, 4);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Period in which there was vehicular growth and with it accidents increased', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('The 60s', true, 5),
('The 70s', false, 5),
('The 80s', false, 5);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('There was an explosive growth of vehicles causing the collapse of major cities', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('The 80s', true, 6),
('The 90s', false, 6),
('The 70s', false, 6);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('It is said to be what gives us the security to conduct ourselves on the road', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Road safety', true, 7),
('Road education', false, 7),
('Traffic law', false, 7);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('What is understood by the right to circulate', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Driving a vehicle from one place to another', true, 8),
('Traveling throughout the country', false, 8),
('The right of any citizen to move within and outside the country according to the political constitution', false, 8);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Traffic law sanctions those who drive in reverse for a distance', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Less than 50 meters', true, 9),
('Greater than 50 meters', false, 9),
('More than 100 meters', false, 9);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The safety of the user on public roads is regulated by', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Road education', true, 10),
('Road safety', false, 10),
('Traffic law', false, 10);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('When there is no adequate road education, by driving imprudently any person is exposed to fines and punishments', 'media', 'seleccion_unica', 2);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Regardless of the type of vehicle they circulate in', true, 11),
('Especially if circulating in a bus or truck', false, 11),
('Preferably if driving a motorcycle', false, 11);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The penalty or punishment applied to a person when they violate one or more legal traffic rules is called', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Infraction', true, 12),
('Sentence', false, 12),
('Sanction', false, 12);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Traveling on highways at a speed higher than 120 kph is considered a serious offense under the current traffic law and entails among other sanctions', 'media', 'seleccion_unica', 3);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('The accumulation of four points on the driver''s license', true, 13),
('The accumulation of six points on the driver''s license', false, 13),
('The accumulation of eight points on the driver''s license', false, 13);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Disregarding a stop sign represented either vertically or horizontally is equivalent to a sanction', 'media', 'seleccion_unica', 2);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Category A', true, 14),
('Category B', false, 14),
('Category C', false, 14);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('A driver who allows children under twelve years of age who measure less than one meter forty-five centimeters to travel without the established restraint devices is exposed to', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('The accumulation of two points on the driver''s license', true, 15),
('The accumulation of four points on the driver''s license', false, 15),
('The accumulation of six points on the driver''s license', false, 15);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The maneuver of overtaking on a curve represents an infraction of the traffic law that is categorized as', 'media', 'seleccion_unica', 2);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Very minor', true, 16),
('Minor', false, 16),
('Serious', false, 16);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The prohibitions that lead to fines, license suspension, or the removal of a vehicle from circulation are established in', 'media', 'seleccion_unica', 2);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Road safety', true, 17),
('Traffic law', false, 17),
('Road education', false, 17);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The traffic law incorporates prohibitions to prevent accidents and risk situations, establishing for their non-compliance', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Sanctions', true, 18),
('Restrictions', false, 18),
('Bonuses', false, 18);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('A person who chooses to accompany a practitioner with their respective temporary permit must have a license whose issuance is not less than', 'media', 'seleccion_unica', 2);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Three years', true, 19),
('Five years', false, 19),
('Ten years', false, 19);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Sanctioned with traffic fines, the driver', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Who turns right with a yield sign without turn restriction', true, 20),
('Who makes a U-turn on a central left-turn lane', false, 20),
('Who turns left with a stop sign if there is a turn restriction', false, 20);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('In places where there is no road signaling, the maximum speed limit is', 'media', 'seleccion_unica', 3);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('80 kph', true, 21),
('60 kph', false, 21),
('50 kph', false, 21);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('On highways, the minimum speed limit is', 'media', 'seleccion_unica', 3);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('80 kph', true, 22),
('60 kph', false, 22),
('50 kph', false, 22);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('In front of schools and hospitals, the maximum speed limit is', 'media', 'seleccion_unica', 3);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('30 kph', true, 23),
('25 kph', false, 23),
('40 kph', false, 23);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The maximum limit in urban and high population zones will be', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('80 kph', true, 24),
('60 kph', false, 24),
('50 kph', false, 24);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Vehicle lights will be used starting from', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('06:00 in the evening until 06:00 in the morning', true, 25),
('06:00 in the morning until 06:00 in the evening', false, 25),
('05:00 in the evening until 05:00 in the morning', false, 25);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The vehicle''s high beams will be used', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('When circulating in the city', true, 26),
('When driving behind another vehicle', false, 26),
('On open roads when there are no vehicles ahead or coming from the opposite direction', false, 26);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Bicimoto, motorcycle and quadricycle type vehicles will use lights', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('All day', true, 27),
('Only when conditions warrant it', false, 27),
('During the night', false, 27);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Cyclists may not circulate on public roads where the minimum speed is', 'media', 'seleccion_unica', 3);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('80 kph', true, 28),
('60 kph', false, 28),
('50 kph', false, 28);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('It is the part of the road exclusively intended for pedestrian traffic', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('The roadway', true, 29),
('The sidewalk', false, 29),
('The curb edge', false, 29);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The shoulder serves to', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Park', true, 30),
('Circulate', false, 30),
('Overtake', false, 30);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('On public roads people relate to each other, we are talking about', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Ecology', true, 31),
('Circulation', false, 31),
('Coexistence', false, 31);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('It is the interrelation between the environment and humans', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Coexistence', true, 32),
('Ecology', false, 32),
('Circulation', false, 32);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The 3 functions that the public road fulfills are', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Circulation, perception and reaction', true, 33),
('Circulation, coexistence and ecological', false, 33),
('Ecological and environmental', false, 33);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The part of the road that is intended for the circulation of vehicles is called', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Shoulder', true, 34),
('Banking', false, 34),
('Roadway', false, 34);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The zone intended for parking vehicles in urgent cases is called', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Shoulder', true, 35),
('Roadway', false, 35),
('Ditch', false, 35);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The two types of public roads that have been defined are', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Urban and rural', true, 36),
('Private and public', false, 36),
('Vehicular and private', false, 36);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('What color and thickness is the stop line', 'media', 'seleccion_unica', 4);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Yellow / 10 cm', true, 37),
('White / 40 cm', false, 37),
('Yellow / 20 cm', false, 37);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The color used to indicate that traffic moves in opposite directions of circulation is', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Yellow', true, 38),
('Red', false, 38),
('White', false, 38);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('What is horizontal demarcation', 'media', 'seleccion_unica', 4);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Plates on metal posts', true, 39),
('Plates in elevated places', false, 39),
('Signals that are painted on the pavement', false, 39);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('They are yellow in color and can be continuous or broken, they are lines', 'media', 'seleccion_unica', 4);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Center', true, 40),
('Lane', false, 40),
('Edge', false, 40);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Route identification signs belong to the group of signs', 'media', 'seleccion_unica', 4);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Information', true, 41),
('Regulation', false, 41),
('Warning', false, 41);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The vertical no overtaking sign is equivalent to the line of', 'media', 'seleccion_unica', 4);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Edge', true, 42),
('Barrier', false, 42),
('Stop', false, 42);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Vertical signs are divided into three groups', 'media', 'seleccion_unica', 4);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Prohibition, restriction, volition', true, 43),
('Intersection, vertical, horizontal', false, 43),
('Regulation, information, warning', false, 43);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The continuous line means', 'media', 'seleccion_unica', 4);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Overtaking is prohibited', true, 44),
('Overtaking is allowed', false, 44),
('Parking is allowed', false, 44);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('What is the difference between the lane line and the center line', 'media', 'seleccion_unica', 4);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('None', true, 45),
('In that the lane line divides lanes in the same direction and the center line in double direction', false, 45),
('In that the lane line divides lanes in double direction and the center line in the same direction', false, 45);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('As a complement to the lane line, reflectors of color ... are used.', 'media', 'seleccion_unica', 4);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Yellow', true, 46),
('White', false, 46),
('Red', false, 46);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('What is hydroplaning', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Skidding of the vehicle on the road', true, 47),
('Flooding on the roadway', false, 47),
('the loss of contact of the tires with the roadway due to water', false, 47);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('What does vertical signaling consist of', 'media', 'seleccion_unica', 4);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Metal plates on metal or wooden posts', true, 48),
('Elevated metal plates', false, 48),
('Signaling on the roadway', false, 48);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('How are reflectors also known', 'media', 'seleccion_unica', 4);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Reflectors', true, 49),
('Luminous', false, 49),
('Cat''s eye', false, 49);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('What is equivalent to the flashing yellow light', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Stop sign', true, 50),
('Yield', false, 50),
('Continue with caution', false, 50);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('As a complement to the center line, reflectors of color ... are used', 'media', 'seleccion_unica', 4);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('White', true, 51),
('Red', false, 51),
('Yellow', false, 51);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('They are all the elements used for traffic regulation', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Traffic devices', true, 52),
('Vertical signs', false, 52),
('Regulatory signs', false, 52);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Guides the driver who must turn left at intersections', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('The channelization line', true, 53),
('The edge lines', false, 53),
('The channelization island', false, 53);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('To counteract centrifugal force, what is called ... is used', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Banking with inclination', true, 54),
('Banking or superelevation', false, 54),
('Banking or super elevation', false, 54);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('They have an orange background, drawings and a black border, they are ... signs', 'media', 'seleccion_unica', 4);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Regulation', true, 55),
('Work zone warning', false, 55),
('Services and tourism', false, 55);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('According to their structure, curves are classified into', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Pronounced and dangerous', true, 56),
('Open and closed', false, 56),
('Vertical and horizontal', false, 56);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('In a traffic light, the flashing red light is equivalent to', 'media', 'seleccion_unica', 4);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('A yield sign', true, 57),
('A stop sign', false, 57),
('Danger prevention', false, 57);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('In regulatory signs, the red circle indicates', 'media', 'seleccion_unica', 4);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Restriction', true, 58),
('Prohibition', false, 58),
('Warning', false, 58);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The line used to prohibit overtaking the lane in which it is located', 'media', 'seleccion_unica', 4);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('The lane line', true, 59),
('The channelization line', false, 59),
('The barrier line', false, 59);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Every work carried out by man to facilitate the traffic of vehicles and people is called', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Traffic delegations', true, 60),
('Squares and parks', false, 60),
('Road structure', false, 60);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The line used to prohibit overtaking on the shoulder is called', 'media', 'seleccion_unica', 4);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Center line', true, 61),
('Edge line', false, 61),
('Barrier line', false, 61);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Banking is designed to', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Eliminate centrifugal force', true, 62),
('Counteract centrifugal force', false, 62),
('Reload centrifugal force', false, 62);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Lane lines allow the driver to', 'media', 'seleccion_unica', 4);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Circulate only in the right lane', true, 63),
('Circulate against traffic', false, 63),
('Circulate using both lanes', false, 63);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('A band crossing the red circle indicates that the signal is for', 'media', 'seleccion_unica', 4);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Warning', true, 64),
('Prohibition', false, 64),
('Restriction', false, 64);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('They have a yellow background, black borders and black symbols, they are ... signs', 'media', 'seleccion_unica', 4);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Luminous signals', true, 65),
('Warning signs', false, 65),
('Regulatory signs', false, 65);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('When they refer to work on the road, warning signs are color', 'media', 'seleccion_unica', 4);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Yellow', true, 66),
('White', false, 66),
('Orange', false, 66);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('They indicate destination and distances, they are ... signs', 'media', 'seleccion_unica', 4);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Regulation', true, 67),
('Information', false, 67),
('Warning', false, 67);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Arranges traffic in different directions of circulation', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Center line', true, 68),
('Lane line', false, 68),
('Barrier line', false, 68);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Indicates that circulation lanes have the same direction', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Channelization line', true, 69),
('Lane line', false, 69),
('Center line', false, 69);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Separates the roadway from the shoulder or gutter', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Barrier line', true, 70),
('Channelization line', false, 70),
('Edge line', false, 70);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Specifically indicate a left turn', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Channelization line', true, 71),
('Channelization island', false, 71),
('Center line', false, 71);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('If we understand the meaning of reflectors as a reference for horizontal demarcation, we reduce the risk of accidents when driving', 'media', 'seleccion_unica', 4);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Under daylight and full sun', true, 72),
('Under prohibited traffic conditions', false, 72),
('Under night conditions with rain or fog', false, 72);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The signs placed on the right side of the roads with sufficient anticipation of potential danger are ... signs', 'media', 'seleccion_unica', 4);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Identification', true, 73),
('Warning', false, 73),
('Restriction', false, 73);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Work protection signs belong to the group of ... signs', 'media', 'seleccion_unica', 4);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Information', true, 74),
('Restriction', false, 74),
('Warning', false, 74);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('One of the functions of road signaling is', 'media', 'seleccion_unica', 4);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Determine passage regulations and the direction of the roads', true, 75),
('Plan travel routes for users', false, 75),
('Avoid excessive braking that wears fibers', false, 75);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('They are used to guide specific vehicular flow and arrange traffic in conflict zones', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Channelization island', true, 76),
('Channelization line', false, 76),
('Center line', false, 76);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('They indicate where the vehicle must stop in case of a stop or yield sign', 'media', 'seleccion_unica', 4);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Parking line', true, 77),
('Stop line', false, 77),
('Lane line', false, 77);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('They are used to facilitate the crossing of pedestrians on the road', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Stop line', true, 78),
('Safety zones', false, 78),
('Crossing zones', false, 78);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Its objective is to allow pedestrians to cross at specific points of a road', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Crossing zone', true, 79),
('Safety zone', false, 79),
('Stop line', false, 79);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('They are used to prevent situations, to guide and regulate traffic, they are white in color', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Words and symbols', true, 80),
('Center lines', false, 80),
('Barrier lines', false, 80);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Obligates stopping the vehicle before a certain vehicular stream', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('No entry sign', true, 81),
('Stop sign', false, 81),
('Yield sign', false, 81);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Markings on the pavement are basically for', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Traffic regulation', true, 82),
('Speed control', false, 82),
('Overtaking prohibitions', false, 82);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('It is a function of road signaling', 'media', 'seleccion_unica', 4);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Warn about possible dangers and obstacles on the road', true, 83),
('Significantly optimize coexistence on the road', false, 83),
('Educate the citizen in the use of public roads', false, 83);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Demarcations for exclusive lanes for public transport, bus stops and parking prohibitions are painted color', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Yellow', true, 84),
('Red', false, 84),
('White', false, 84);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('According to the traffic law, it is an incorrect maneuver and a sanction is applied to the driver who stops the vehicle', 'media', 'seleccion_unica', 2);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('In front of a stop line', true, 85),
('In front of a yield sign', false, 85),
('In the middle of an intersection', false, 85);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The yellow light of the traffic light is the warning signal that', 'media', 'seleccion_unica', 4);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Warns of the change to the green light', true, 86),
('Warns of the change to the red light', false, 86),
('Warns of passage without restriction', false, 86);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The vertical sign that regulates the right of way is', 'media', 'seleccion_unica', 4);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Stop', true, 87),
('No entry', false, 87),
('No overtaking', false, 87);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The yellow color on curbs and gutters indicates', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Parking is allowed', true, 88),
('Parking is prohibited', false, 88),
('Overtaking is prohibited', false, 88);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The loss of contact between the vehicle''s tires and the rolling surface due to water is called', 'media', 'seleccion_unica', 5);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Flood', true, 89),
('Hydro-scourge', false, 89),
('Hydroplaning', false, 89);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('One of its functions is to decrease the speed of motor vehicles circulating on the road', 'media', 'seleccion_unica', 3);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('The pedestrian traffic light', true, 90),
('Advertising signage on the road', false, 90),
('The vehicular traffic light', false, 90);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Road signaling responds to certain characteristics in shape, size, color and arrangement; this is to achieve', 'media', 'seleccion_unica', 4);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Provide fluidity to traffic, and achieve maximum benefit', true, 91),
('Uniformity and homogeneity in messages', false, 91),
('Train the user for proper performance of their functions', false, 91);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Guides the driver who wishes to turn left at intersections is called', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('The channelization line', true, 92),
('The channelization island', false, 92),
('Shoulder markings', false, 92);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Any condition against the driver at the moment of steering the vehicle', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Climatic conditions', true, 93),
('Adverse conditions', false, 93),
('Environmental conditions', false, 93);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('They are marked in places with a large amount of pedestrian traffic', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Safety zone', true, 94),
('Channelization markings', false, 94),
('Parking zones', false, 94);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The Stop is a ... sign', 'media', 'seleccion_unica', 4);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Warning', true, 95),
('Information', false, 95),
('Regulation', false, 95);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The yellow color on the pavement will always indicate to the driver that', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('That they circulate through an area of higher risk', true, 96),
('That they circulate through a medium risk road', false, 96),
('That they circulate through an area without any risk', false, 96);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('They are also known as markings on the pavement', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Vertical devices', true, 97),
('Horizontal devices', false, 97),
('Information signs', false, 97);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('On the pavement, they are used to prevent situations, to guide and regulate traffic', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Regulatory signs', true, 98),
('Words and symbols on the road', false, 98),
('Traffic light lights', false, 98);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('One of the functions is to separate the left turn lane from the main lanes, its name is', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Shoulder marking lines', true, 99),
('Lane line', false, 99),
('Channelization line', false, 99);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Fulfills the function of separating lanes that carry the same direction', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Lane line', true, 100),
('Center line', false, 100),
('Stop line', false, 100);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Regulatory signs are classified into', 'media', 'seleccion_unica', 4);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Occasional and permanent', true, 101),
('Restrictive and prohibitive', false, 101),
('Destination and identification', false, 101);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('According to the road design, if the curve is to the right, the driver will be able to observe the inclination or superelevation', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('On the right edge of the road', true, 102),
('On the left edge of the road', false, 102),
('Toward the central edge of the road', false, 102);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('When observing the flashing red light of the traffic light, the driver must interpret that they are', 'media', 'seleccion_unica', 4);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Before a maximum risk situation where they must stop the vehicle', true, 103),
('Before a medium risk situation and must reduce speed', false, 103),
('Before no risk and can continue without difficulty', false, 103);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('What types of brake systems do we use', 'media', 'seleccion_unica', 5);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Cooling system', true, 104),
('Drum and tightening disc system', false, 104),
('ACS systems', false, 104);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Ball joints and steering box are components of the ... system', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Steering', true, 105),
('Brakes', false, 105),
('Electrical', false, 105);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The fork, release bearing, pressure plate and disc are components of the ... system', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Brakes', true, 106),
('Clutch', false, 106),
('Lubrication', false, 106);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The thermostat, fan and radiator are components of the ... system', 'media', 'seleccion_unica', 5);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Lubrication', true, 107),
('Cooling', false, 107),
('Fuel', false, 107);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Responsible for converting engine gases into less polluting gases', 'media', 'seleccion_unica', 5);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('The muffler', true, 108),
('The catalytic converter', false, 108),
('The regulator', false, 108);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The seat belt is mandatory for', 'media', 'seleccion_unica', 5);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('The driver', true, 109),
('None', false, 109),
('All occupants of the vehicle', false, 109);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The obligation to use the seat belt falls on', 'media', 'seleccion_unica', 5);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('The traffic officer', true, 110),
('The vehicle driver', false, 110),
('The traffic law', false, 110);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The oil pan, filters and dipstick are components of the ... system', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Cooling', true, 111),
('Lubrication', false, 111),
('Electrical', false, 111);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The drum, pads and discs are components of the ... system', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Brakes', true, 112),
('Clutch', false, 112),
('Damping', false, 112);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Tires, seats and the stabilizer bar are components of the ... system', 'media', 'seleccion_unica', 5);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Brakes', true, 113),
('Suspension and damping', false, 113),
('Steering', false, 113);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The vehicle inspection must be carried out', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Every week', true, 114),
('Every month', false, 114),
('Every day', false, 114);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('To overcome losses resulting from heat, friction and wear, the engine requires more energy and this is obtained', 'media', 'seleccion_unica', 5);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('From greater lubrication and water', true, 115),
('From the injection of more fuel', false, 115),
('From the injection of more lubricant', false, 115);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The system responsible for maintaining gas emissions at the optimum permitted level is', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Carburetion system', true, 116),
('Exhaust system', false, 116),
('General emission control system', false, 116);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Used to guide the vehicle in one or another direction', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Electrical system', true, 117),
('Steering system', false, 117),
('Clutch system', false, 117);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('When driving your vehicle, how is defensive driving defined', 'media', 'seleccion_unica', 6);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Driving confidently', true, 118),
('Driving anticipating every dangerous situation', false, 118),
('Driving smoothly and keeping distance', false, 118);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('A tire with low inflation pressure causes', 'media', 'seleccion_unica', 5);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Wear more at the edges', true, 119),
('Wear more in the center of its tread', false, 119),
('The vehicle to have better stability', false, 119);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('A tire with high pressure causes', 'media', 'seleccion_unica', 5);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Wear more at the edges', true, 120),
('Wear more in the center of its tread', false, 120),
('More stability to the vehicle', false, 120);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Sleepiness while driving can be caused by', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Ambient heat', true, 121),
('Excess speed', false, 121),
('Mental conditions', false, 121);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The following are factors that influence night conditions', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Visibility, speed and lighting', true, 122),
('Roads, bridges, and curves', false, 122),
('Vehicle, roads and driver', false, 122);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Exhibitionism, recklessness and negligence are ... conditions', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Formal', true, 123),
('Physical', false, 123),
('Emotional or mental', false, 123);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Having an up-to-date license and the vehicle with documents and in good condition are', 'media', 'seleccion_unica', 2);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Formal conditions', true, 124),
('Technical conditions', false, 124),
('Normal conditions', false, 124);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('It is the contact that the driver has with the environment that surrounds them', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Intellection', true, 125),
('Volition', false, 125),
('Perception', false, 125);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('A permanent health problem can be', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Eyesight problems', true, 126),
('Fatigue', false, 126),
('Intoxication', false, 126);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The driver interprets the stimuli perceived according to their knowledge', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Volition', true, 127),
('Perception', false, 127),
('Intellection', false, 127);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The driver reacts and makes decisions in their driving', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Volition', true, 128),
('Intellection', false, 128),
('Perception', false, 128);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('When we ingest medications we can say that all of them influence driving negatively', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('No, although we must know which do and which do not', true, 129),
('Yes because they are all drugs that produce sleep', false, 129),
('Yes because it is prohibited to drive under the effects of medications', false, 129);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Fatigue, sleep and vision problems are considered adverse ... conditions', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Physical', true, 130),
('Mental', false, 130),
('Environmental', false, 130);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Safety triangles must be placed at a distance of', 'media', 'seleccion_unica', 6);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('22 m the front one and 50 m the back one', true, 131),
('72 m the front one and 15 m the back one', false, 131),
('15 m the front one and 90 m the back one', false, 131);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Under normal conditions, the reaction time is', 'media', 'seleccion_unica', 6);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('3 seconds', true, 132),
('1 second', false, 132),
('2 seconds', false, 132);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('They have right of way priority over other vehicles', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Vehicles circulating on rails', true, 133),
('Vehicles at road crossings', false, 133),
('Government vehicles', false, 133);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('To eliminate the blind spot, the driver must', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Look as far forward as possible', true, 134),
('Warn the driver ahead', false, 134),
('Turn the head to check that area', false, 134);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('When does a rear-end collision occur', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Due to excess speed', true, 135),
('When the distance is not kept', false, 135),
('When we brake suddenly', false, 135);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('How is the interval rule applied', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('1 second for every 3 meters of length', true, 136),
('3 seconds for every 2 meters of length', false, 136),
('1 second for every 5 meters of length', false, 136);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('When driving a vehicle that measures more than 6 meters, the ... rule is applied', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Interval', true, 137),
('Two-second', false, 137),
('Three-second', false, 137);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('When should the short light (low beam) be used', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('When it gets dark', true, 138),
('From 6 in the evening', false, 138),
('When passing another vehicle', false, 138);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('With what type of vehicle is the interval rule applied', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Small vehicles', true, 139),
('Light vehicles', false, 139),
('Vehicles that measure more than 6 meters', false, 139);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The most recommended rule for following another vehicle is based on', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Meters', true, 140),
('Times', false, 140),
('Kilometers', false, 140);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The main cause of head-on collisions is', 'media', 'seleccion_unica', 6);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Not keeping distance', true, 141),
('Invading the left lane', false, 141),
('Invading the right lane', false, 141);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('It is prohibited to overtake in', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('A section of the road', true, 142),
('An intersection', false, 142),
('A 2-lane road', false, 142);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('In case of fog, what should a driver do', 'media', 'seleccion_unica', 6);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Reduce speed and stay alert', true, 143),
('Maintain speed and turn on lights', false, 143),
('Reduce speed and use low beams', false, 143);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('In an intersection between street and avenue, if there is no signaling, the right of way is for', 'media', 'seleccion_unica', 7);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('The one circulating on the avenue', true, 144),
('The one circulating on the street', false, 144),
('The one turning right', false, 144);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('At intersections, the driver warns the one behind that they are going to stop by means of', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('The right turn signal', true, 145),
('The brake light', false, 145),
('The emergency light', false, 145);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('According to right of way priorities, the 3rd place is occupied by', 'media', 'seleccion_unica', 7);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('The main road', true, 146),
('Emergency vehicles', false, 146),
('The stop and the yield', false, 146);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('When driving on the road we should direct our sight', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Only at the vehicle ahead', true, 147),
('Only to the right side', false, 147),
('Forward, both sides and behind', false, 147);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('To avoid colliding with the vehicle ahead we must', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Not neglect the blind spots', true, 148),
('Keep distance and stay alert', false, 148),
('Stay alert using mirrors', false, 148);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('It is considered one of the most dangerous maneuvers when driving', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Overtaking', true, 149),
('Defensive driving', false, 149),
('Head-on collision', false, 149);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Normal reaction time can be affected by', 'media', 'seleccion_unica', 6);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('The state of the road', true, 150),
('The state of the driver', false, 150),
('The speed of the vehicle', false, 150);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The braking distance depends on', 'media', 'seleccion_unica', 6);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('The speed of the vehicle', true, 151),
('The state of the driver', false, 151),
('The age of the driver', false, 151);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The place on the public road where 2 or more roads converge is', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('The intersection', true, 152),
('The shoulder', false, 152),
('The road structure', false, 152);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The science that studies the causes and effects of traffic accidents is called', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Road safety', true, 153),
('Road education', false, 153),
('Road accidentology', false, 153);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('In the priorities of right of way at intersections, first place is occupied by', 'media', 'seleccion_unica', 7);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Vehicles circulating on rails', true, 154),
('The right-hand law', false, 154),
('The authority', false, 154);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('To prevent head-on collisions when overtaking, what we must do is', 'media', 'seleccion_unica', 6);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Observe through rearview mirrors', true, 155),
('Always look ahead that another vehicle does not invade the left lane', false, 155),
('Eliminate the blind spot', false, 155);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('In a driver in a state of drunkenness, the stopping distance will be', 'media', 'seleccion_unica', 6);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Equal to normal', true, 156),
('Less than normal', false, 156),
('Greater than normal', false, 156);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Head-on collisions generally occur by', 'media', 'seleccion_unica', 6);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Invading the right lane', true, 157),
('Invading the left lane', false, 157),
('Not maintaining distance', false, 157);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('According to priorities of passage by movement, the left turn occupies', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('First place', true, 158),
('Second place', false, 158),
('Third place', false, 158);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('In the priorities of passage by movements, the right turn occupies', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Third place', true, 159),
('Second place', false, 159),
('First place', false, 159);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The type of collision where the speed of both vehicles is added', 'media', 'seleccion_unica', 3);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Rear-end collision', true, 160),
('Side collision', false, 160),
('Head-on collision', false, 160);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('A circulation rule that helps the pedestrian make themselves visible when circulating under rain, fog and at night is', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('The use of a flashlight or reflective material', true, 161),
('The use of non-flashy colors and clothing', false, 161),
('The use of a dark blue vest or clothing', false, 161);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('According to vehicular circulation rules, when performing a maneuver at an intersection one must always', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Observe toward the center of the road', true, 162),
('Look toward the left and right sides', false, 162),
('Turn on emergency lights', false, 162);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('When a pedestrian is going to cross a road, before doing so they must look', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Toward their right and toward their left', true, 163),
('Forward fixedly', false, 163),
('Fixedly toward the traffic light', false, 163);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('If there is no traffic officer, the vehicular traffic light is the priority of passage', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Restoring vehicular traffic', true, 164),
('Regulating an intersection or conflict point', false, 164),
('Regulating the passage signs and restrictions', false, 164);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('It has priority over the street, but does not have it over main roads', 'media', 'seleccion_unica', 7);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('The avenue', true, 165),
('The authority', false, 165),
('The traffic light', false, 165);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The minimum recommended distance to change the light (to low beam) when having another vehicle in front', 'media', 'seleccion_unica', 6);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Fifty meters', true, 166),
('One hundred and fifty meters', false, 166),
('Two hundred and fifty meters', false, 166);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('In descending order, the priority of passage that occupies sixth place is', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Main roads', true, 167),
('Right-hand law', false, 167),
('Avenues and streets', false, 167);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Reducing speed to perform the necessary maneuver with calm and safety is what the circulation rule establishes when', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('The permitted speed is sixty kilometers per hour', true, 168),
('The maximum speed is eighty kilometers per hour', false, 168),
('The driver approaches an intersection or roundabout', false, 168);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('They can be recognized because they are generally oriented from east to west or vice versa', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Main roads', true, 169),
('Avenues', false, 169),
('Streets', false, 169);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('They can be recognized because they are generally oriented from north to south or vice versa', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Main roads', true, 170),
('Avenues', false, 170),
('Streets', false, 170);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('It must always be applied, even if one has the right of way', 'media', 'seleccion_unica', 7);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('The right-hand law', true, 171),
('Courtesy and communication', false, 171),
('The turn law', false, 171);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('It is the distance that the vehicle travels from when the danger is perceived until applying the brake', 'media', 'seleccion_unica', 6);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Reaction distance', true, 172),
('Braking distance', false, 172),
('Stopping distance', false, 172);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('According to pedestrian circulation rules, it is established', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Generally a driver detects a pedestrian more quickly at the moment of circulation', true, 173),
('Usually the pedestrian detects a driver more quickly when circulating', false, 173),
('Usually the pedestrian notices a driver less quickly when circulating', false, 173);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('According to pedestrian circulation rules, one should not walk or circulate on a bicycle', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('On roads or high-speed highways', true, 174),
('On tracks and velodromes intended for that purpose', false, 174),
('On footpaths or bike paths intended for that purpose', false, 174);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Defensive driving consists of', 'media', 'seleccion_unica', 6);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Driving in a confident manner', true, 175),
('Driving on any road', false, 175),
('Anticipating dangerous situations', false, 175);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Defined as the culpable action committed by drivers of vehicles, passengers or pedestrians when circulating', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Collision', true, 176),
('Road accidentology', false, 176),
('Traffic accident', false, 176);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('In descending order, the priority of passage that occupies the ninth place is', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Avenues and streets', true, 177),
('Right-hand law', false, 177),
('Courtesy and communication', false, 177);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Applying it as a positive, solidary attitude of respect and consideration in driving will always help prevent traffic accidents', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('The rule of courtesy and communication', true, 178),
('The rule of circulation and maneuver', false, 178),
('The rule of space environment and braking', false, 178);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Complying with the circulation rule that indicates to the pedestrian that they must stop and look both ways before crossing the road helps so that', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('They cross when they can do so safely', true, 179),
('They cross when they can do so calmly', false, 179),
('They cross when they can do so with agility', false, 179);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('In the presence of obstacles to see traffic clearly before crossing the road, the pedestrian must', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Quickly approach the circulating traffic', true, 180),
('Slowly approach, and cross both lanes', false, 180),
('Slowly approach to a place where they can see', false, 180);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The current regulations on road safety and traffic establish that for the pedestrian to perform an adequate and safe circulation they must', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Adjust to a series of rules and restrictions', true, 181),
('Adjust to the convenience of vehicular traffic', false, 181),
('Adapt to the changes in pedestrian traffic', false, 181);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The distance that the vehicle travels from when the brake pedal is applied until the vehicle stops is called', 'media', 'seleccion_unica', 6);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Reaction distance', true, 182),
('Braking distance', false, 182),
('Stopping distance', false, 182);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('In descending order, the priority of passage that occupies the second position', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Authority', true, 183),
('Traffic light', false, 183),
('Right-hand law', false, 183);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('In pedestrian circulation, footpaths, squares and sidewalks are known as', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Places for recreation and leisure', true, 184),
('Sites intended for that purpose', false, 184),
('Sites intended for another purpose', false, 184);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The impact of a vehicle against one or more livestock is known as', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Run-over', true, 185),
('Collision', false, 185),
('Rollover', false, 185);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('If we intend to leave a roundabout by the 3rd or 4th exit, we must use', 'media', 'seleccion_unica', 8);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('The internal lane', true, 186),
('The external lane', false, 186),
('Any lane', false, 186);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('In roundabouts, the right of way is regulated by', 'media', 'seleccion_unica', 7);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('The stop line', true, 187),
('Stop signs', false, 187),
('Yield', false, 187);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('In roundabouts, the priority of passage is for', 'media', 'seleccion_unica', 8);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('The vehicles circulating on it', true, 188),
('Official vehicles', false, 188),
('Public transport ones', false, 188);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The permitted speed in the roundabout is', 'media', 'seleccion_unica', 3);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('40 kph', true, 189),
('30 kph', false, 189),
('25 kph', false, 189);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('If we intend to leave a roundabout by the 1st or 2nd exit, we must use', 'media', 'seleccion_unica', 8);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('The internal lane', true, 190),
('The external lane', false, 190),
('Any lane', false, 190);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Takes advantage of the gases resulting from the engine combustion.', 'media', 'seleccion_unica', 5);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Turbo injector', true, 191),
('Turbo charger', false, 191),
('Carburetor', false, 191);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The lights of the city, the lights of screens are known as', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Sonic pollution', true, 192),
('Luminous pollution', false, 192),
('Pollution by combustion', false, 192);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('One liter of oil spilled on the ground is equivalent to the pollution of', 'media', 'seleccion_unica', 9);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Half a hectare of land', true, 193),
('1 manzana (unit of area) of land', false, 193),
('1 hectare of land', false, 193);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('In the transport industry, fuel costs', 'media', 'seleccion_unica', 10);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Are the most important', true, 194),
('Decrease the cost of haulage', false, 194),
('Must be avoided at all costs', false, 194);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The main air pollutants are classified into', 'media', 'seleccion_unica', 9);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Solids and liquids', true, 195),
('Sonic and luminous', false, 195),
('Primary and secondary', false, 195);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Ecological awareness refers to', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Road circulation', true, 196),
('Fuel consumption', false, 196),
('The conservation of the environment and environmental pollution', false, 196);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('They are the pollutants that remain in the atmosphere exactly as they are released', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Secondary pollutants', true, 197),
('Primary pollutants', false, 197),
('Solids and liquids', false, 197);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('It is the product of the chemical reaction of two or more primary pollutants.', 'media', 'seleccion_unica', 6);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Secondary pollutants', true, 198),
('Primary pollutants', false, 198),
('Solids and liquids', false, 198);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Ecological awareness also relates to', 'media', 'seleccion_unica', 9);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('The generation of foreign currency in the country', true, 199),
('Export of products and services', false, 199),
('The set of wastes that deteriorate the environment', false, 199);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Respiratory and circulation problems that affect the brain causing behavioral alterations can be experienced in driving as', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Healthy effects on the respiratory system', true, 200),
('Effects of pollution that affect the health of the driver', false, 200),
('Effects of the good state of the emission control system', false, 200);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Appropriately using your vehicle''s air (aerodynamics) can generate a saving of', 'media', 'seleccion_unica', 9);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('From 5% to 20%', true, 201),
('From 10% to 15%', false, 201),
('From 10% to 25%', false, 201);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('A good driving habit that contributes to the reduction of environmental pollution is', 'media', 'seleccion_unica', 9);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Driving with the lead foot technique', true, 202),
('Applying the feather foot technique', false, 202),
('Maintaining braking to avoid high speeds', false, 202);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Carbon monoxide is a ... gas', 'media', 'seleccion_unica', 9);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Black and with strong odors', true, 203),
('Gray and without odor', false, 203),
('Colorless and odorless', false, 203);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('In San José, pollution is equivalent to', 'media', 'seleccion_unica', 9);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('The smoke of 5 packs of cigarettes', true, 204),
('The smoke of 3 packs of cigarettes', false, 204),
('The smoke of 2 packs of cigarettes', false, 204);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The main element of the greenhouse effect is called', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Sulfur dioxide', true, 205),
('Carbon dioxide', false, 205),
('Nitrogen oxide', false, 205);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Solid wastes are a source of pollutant, mainly ... ones', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Biodegradable', true, 206),
('Non-biodegradable', false, 206),
('Ecological', false, 206);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Keeping the vehicle in good condition saves you fuel by up to', 'media', 'seleccion_unica', 10);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('10%', true, 207),
('15%', false, 207),
('9%', false, 207);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('40% of rivers and lakes are polluted as a consequence of', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Used oils in engines', true, 208),
('Ecological waste', false, 208),
('Biodegradable waste', false, 208);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('What are the forces that intervene in the displacement of the vehicle.', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Rolling resistance', true, 209),
('Force of gravity', false, 209),
('Banking or superelevation', false, 209);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('We can take advantage of the engine curves in a good way through the', 'media', 'seleccion_unica', 5);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Odometer', true, 210),
('Tachometer', false, 210),
('Speedometer', false, 210);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Spoilers are placed on vehicles to', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Counteract centrifugal force', true, 211),
('Counteract drag force', false, 211),
('Counteract lift force', false, 211);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The speed diagram serves to', 'media', 'seleccion_unica', 3);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Know the critical area of the engine', true, 212),
('Know the good operation of the engine', false, 212),
('To consume more fuel', false, 212);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('One way to take advantage of the speed diagram is', 'media', 'seleccion_unica', 3);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Circulate at 40 kph in fourth gear and at 1400 rpm', true, 213),
('Circulate at 100 kph in third gear and at 3000 rpm', false, 213),
('Circulate at 40 kph in first gear at 1500 rpm', false, 213);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The force transmitted from the engine power to the gearbox is called', 'media', 'seleccion_unica', 3);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Torsional torque', true, 214),
('Contorsional torque', false, 214),
('Differential', false, 214);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Keeping the engine in good condition allows us', 'media', 'seleccion_unica', 5);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Higher fuel consumption', true, 215),
('Higher expenditure of foreign currency', false, 215),
('Saving money', false, 215);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The exhaust and cooling systems, the engine, auxiliary devices and tires form a set of elements where', 'media', 'seleccion_unica', 5);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('The distribution of the vehicle''s fuel consumption occurs', true, 216),
('The greatest explosion of fuel consumed by the vehicle occurs', false, 216),
('Contaminated fuel is expelled into the air without control', false, 216);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('In technical economic and efficient driving, the correct thing is to drive at low revolutions because thus the driver will be able to accelerate', 'media', 'seleccion_unica', 10);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('From that level to an interior or lower one', true, 217),
('From that level to a higher one', false, 217),
('At that same level all the time', false, 217);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Form part of the forces that intervene in the displacement of the vehicle over the rolling surface', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Thermodynamic resistance and thermo-wind resistance', true, 218),
('Caloric resistance and cooling resistance', false, 218),
('Aerodynamic resistance and inertia resistance', false, 218);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('When the vehicle displaces on the road, the maximum possible engine performance in any driving circumstance is achieved', 'media', 'seleccion_unica', 5);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('With the mechanical control of bars and gears', true, 219),
('With the technical control of the intervening forces', false, 219),
('Through displacement over-revolution', false, 219);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('What we know as characteristic curves of the engine allow us to know its behavior', 'media', 'seleccion_unica', 5);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Under extreme heating conditions', true, 220),
('Under different operation conditions', false, 220),
('Under extreme cooling conditions', false, 220);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('In the mind and skills of each driver rests the responsibility to practice', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Technical, economic and efficient driving', true, 221),
('Interurban driving on streets and alleys', false, 221),
('Urban driving on streets and roads', false, 221);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('In the pistons of an internal combustion engine, a movement is generated that is transformed into what is known as', 'media', 'seleccion_unica', 5);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Translation movement', true, 222),
('Rotation movement', false, 222),
('Rotating circulation', false, 222);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Engine operation at high revolutions can be avoided when driving in the city', 'media', 'seleccion_unica', 5);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('If we let the engine drop slowly in revolutions', true, 223),
('If we strain the engine so it raises the revolution range', false, 223),
('If we accelerate the green zone range', false, 223);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('A certain power developed by the engine of a transport vehicle can be seen transformed into', 'media', 'seleccion_unica', 5);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Certain speed or load capacity', true, 224),
('Certain speed without load capacity', false, 224),
('Only load capacity without any speed', false, 224);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Reviewing, recognizing and discussing road information is useful for the optimal achievement of', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Driving vehicles in a technical, economic and efficient manner', true, 225),
('Driving vehicles in a regular, constant and permanent manner', false, 225),
('Driving for extreme periods and routes and of long mileage', false, 225);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('They are characterized by being vertical upward and horizontal opposite to the movement of the vehicle', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Lift and drag force', true, 226),
('Centrifugal force and inertia force', false, 226),
('Inertia force and grade force', false, 226);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('With the monitoring and application of an efficient transport and driving program, ... will be achieved', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Saving more money for the purchase of automotive spare parts', true, 227),
('Contributing to improve the environment and quality of life', false, 227),
('Savings for the supply of more fuel', false, 227);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('When driving on a route with a downward slope, the inclination of this will have', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('A tendency to compression the vehicle and decelerate it', true, 228),
('A tendency to brake the vehicle and decompression it', false, 228),
('A tendency to accelerate the vehicle to dangerous speeds', false, 228);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('When driving in urban traffic, it is important to drive and control the force of inertia as this can generate', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('High fuel consumption and vehicle wear', true, 229),
('A non-existent consumption of fuel and spare parts', false, 229),
('A deficient consumption of fuels and lubricants', false, 229);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The professional operation of a vehicle depends on', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('The ability to overtake on a high-speed road', true, 230),
('The capacity developed by a driver or operator of mobile equipment', false, 230),
('The skill for overtaking in a straight line', false, 230);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('In addition to reducing the risk of traffic accidents, the optimal conservation of our motor vehicle gives us as a benefit', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Economically maintaining the market value', true, 231),
('Socially by maintaining its appearance and aesthetics', false, 231),
('Economically by reducing its market value', false, 231);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('In technical, economic and efficient driving, it is intended that the driver finds themselves and has knowledge of the type of vehicle they drive so that', 'media', 'seleccion_unica', 10);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('The future driver is competitive by reducing operation costs', true, 232),
('The future driver is aware of the automotive industry', false, 232),
('The future driver is indifferent to fuel consumption', false, 232);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('While the vehicle remains in circulation, the contact of the tires with the roadway produces friction resulting in what we know as', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Attack resistance', true, 233),
('Resistance to movement', false, 233),
('Clutch resistance', false, 233);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('When driving in town, what is recommended for changing to a lower speed ratio is', 'media', 'seleccion_unica', 3);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Make the engine rise quickly in revolutions', true, 234),
('Let the engine drop slowly in revolutions', false, 234),
('Make the engine drop to zero revolutions', false, 234);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Inertia resistance and aerodynamic resistance are those that', 'media', 'seleccion_unica', 1);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Oppose the displacement of the vehicle', true, 235),
('Impel the displacement of the vehicle', false, 235),
('Stop the displacement of the vehicle', false, 235);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Any motor vehicle, by its drag force being opposite to its movement,', 'media', 'seleccion_unica', 5);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Exerts greater influence on the progress of the vehicle', true, 236),
('Causes less influence on the progress of the vehicle', false, 236),
('Provides greater rolling on the progress of the vehicle', false, 236);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The needle of an analog tachometer turns over a numbering that', 'media', 'seleccion_unica', 10);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Starts with one and can end in five or seven', true, 237),
('Starts with one and can end in five, seven or more', false, 237),
('Starts with fifteen and ends in two or three', false, 237);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('To make better use of the engine''s load capacity, the key is', 'media', 'seleccion_unica', 5);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Use the maximum rpm ranges', true, 238),
('Apply the progressive gear change', false, 238),
('Use the minimum rpm ranges', false, 238);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('The price of diesel or gasoline fuels will always tend to rise due to variations', 'media', 'seleccion_unica', 10);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('In supply and demand', true, 239),
('In demand and consumption', false, 239),
('In the supply of prices', false, 239);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('According to what the practice of technical, economic and efficient driving determines, a costly bad habit that must be avoided at all times while driving is', 'media', 'seleccion_unica', 10);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('The non-revolution of the engine', true, 240),
('The over-revolution of the engine', false, 240),
('The revolution of the engine', false, 240);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('In technical, economic and efficient driving, the progressive change method is the best way to', 'media', 'seleccion_unica', 10);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('Change directionals', true, 241),
('Change route or destination', false, 241),
('Change gear (speed)', false, 241);

INSERT INTO preguntas (enunciado, dificultad, tipo_pregunta, id_tema)
VALUES ('Facilitates acceleration and engine power within the range established in economic and efficient driving.', 'media', 'seleccion_unica', 5);

INSERT INTO opciones (texto, es_correcta, id_pregunta)
VALUES
('The speed gauge', true, 242),
('The tachometer', false, 242),
('The temperature gauge', false, 242); 