const db = require("./db")

const ESTRUTURA_CLIENTE = `
    DROP TABLE IF EXISTS cliente;
    CREATE TABLE cliente (
        id int(11) NOT NULL AUTO_INCREMENT,
        nome varchar(100) NOT NULL,
        cpf char(14) NOT NULL,
        celular varchar(14) NOT NULL,
        email char(100) NOT NULL,
        senha varchar(512) NOT NULL,
        PRIMARY KEY (id),
        UNIQUE KEY cpf (cpf),
        UNIQUE KEY email (email)
    ) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
`

const DADOS_CLIENTE = `
    INSERT INTO cliente VALUES
    (1, 'Tanjiro kamado', '123.456.789-76',	'(42)94444-0909', 'kamdo@gmail.com',	'$2b$10$CF3FCuJPKwferj3VyvJ8BOASl2mzxVkWw1mWlRm.y1W/43ol.Alx.')
` 

const ESTRUTURA_PRODUTO = `
    DROP TABLE IF EXISTS sabores_sorvete;
    CREATE TABLE sabores_sorvete (
      id        INT          PRIMARY KEY,
      sabor     VARCHAR(100) NOT NULL,
      categoria VARCHAR(50)  NOT NULL
  );
`

const DADOS_PRODUTO = `
    INSERT INTO sabores_sorvete VALUES
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
        `

async function criar_estrutura() {
  const connection = await db.pool.getConnection();
    try {
        await connection.beginTransaction();

        console.log("Criando tabela 'cliente'...");
        await connection.query(ESTRUTURA_CLIENTE);
        await connection.query(DADOS_CLIENTE);

        console.log("Criando tabela 'produto'...");
        await connection.query(ESTRUTURA_PRODUTO);
        await connection.query(DADOS_PRODUTO);         

        await connection.commit();
        console.log("Migration executada com sucesso!");
        process.exit(0);
    } catch (error) {
        await connection.rollback();
        console.log(error)
        process.exit(1);
    } finally {
        connection.release();
    }
}

criar_estrutura() 