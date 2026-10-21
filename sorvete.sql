CREATE TABLE sabores_sorvete (
    id        INT          PRIMARY KEY,
    sabor     VARCHAR(100) NOT NULL,
    categoria VARCHAR(50)  NOT NULL
);

INSERT INTO sabores_sorvete (id, sabor, categoria) VALUES
(1,  'Chocolate',                        'Clássico'),
(2,  'Baunilha',                         'Clássico'),
(3,  'Morango',                          'Clássico'),
(4,  'Creme',                            'Clássico'),
(5,  'Chocolate com menta',              'Clássico'),
(6,  'Napolitano',                       'Clássico'),
(7,  'Flocos',                           'Clássico'),
(8,  'Cookies and Cream',                'Clássico'),
(9,  'Pistache',                         'Clássico'),
(10, 'Chocolate belga',                  'Clássico'),
(11, 'Milho verde',                      'Regional'),
(12, 'Açaí',                             'Regional'),
(13, 'Cupuaçu',                          'Regional'),
(14, 'Tapioca',                          'Regional'),
(15, 'Coco',                             'Regional'),
(16, 'Cajá',                             'Regional'),
(17, 'Graviola',                         'Regional'),
(18, 'Maracujá',                         'Frutado'),
(19, 'Limão',                            'Frutado'),
(20, 'Laranja',                          'Frutado'),
(21, 'Abacaxi',                          'Frutado'),
(22, 'Manga',                            'Frutado'),
(23, 'Morango com leite condensado',     'Frutado'),
(24, 'Framboesa',                        'Frutado'),
(25, 'Doce de leite',                    'Especial'),
(26, 'Paçoca',                           'Especial'),
(27, 'Nutella',                          'Especial'),
(28, 'Churros',                          'Especial'),
(29, 'Red Velvet',                       'Especial'),
(30, 'Cheesecake com frutas vermelhas',  'Especial');

-- Todos os sabores ordenados por categoria e nome
SELECT * FROM sabores_sorvete
ORDER BY categoria, sabor;

-- Contagem de sabores por categoria
SELECT categoria, COUNT(*) AS total
FROM sabores_sorvete
GROUP BY categoria
ORDER BY total DESC;

-- Buscar sabores que contenham "chocolate"
SELECT * FROM sabores_sorvete
WHERE sabor LIKE '%chocolate%';

-- Apenas sabores regionais
SELECT id, sabor FROM sabores_sorvete
WHERE categoria = 'Regional';