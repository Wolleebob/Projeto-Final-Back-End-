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
      id        INT           PRIMARY KEY,
      sabor     VARCHAR(100)  NOT NULL,
      categoria VARCHAR(50)   NOT NULL,
      preco     DECIMAL(5,2)  NOT NULL
  );
`

const DADOS_PRODUTO = `
    INSERT INTO sabores_sorvete VALUES
        (1,  'Chocolate',                        'Clássico',  12.00),
        (2,  'Baunilha',                         'Clássico',  11.50),
        (3,  'Morango',                          'Clássico',  12.00),
        (4,  'Creme',                            'Clássico',  11.50),
        (5,  'Chocolate com menta',              'Clássico',  13.50),
        (6,  'Napolitano',                       'Clássico',  12.50),
        (7,  'Flocos',                           'Clássico',  12.50),
        (8,  'Cookies and Cream',                'Clássico',  15.00),
        (9,  'Pistache',                         'Clássico',  18.00),
        (10, 'Chocolate belga',                  'Clássico',  16.50),
        (11, 'Milho verde',                      'Regional',  13.00),
        (12, 'Açaí',                             'Regional',  17.00),
        (13, 'Cupuaçu',                          'Regional',  16.00),
        (14, 'Tapioca',                          'Regional',  14.00),
        (15, 'Coco',                             'Regional',  13.00),
        (16, 'Cajá',                             'Regional',  14.50),
        (17, 'Graviola',                         'Regional',  15.00),
        (18, 'Maracujá',                         'Frutado',   12.50),
        (19, 'Limão',                            'Frutado',   11.50),
        (20, 'Laranja',                          'Frutado',   11.50),
        (21, 'Abacaxi',                          'Frutado',   12.00),
        (22, 'Manga',                            'Frutado',   12.50),
        (23, 'Morango com leite condensado',     'Frutado',   15.50),
        (24, 'Framboesa',                        'Frutado',   16.00),
        (25, 'Doce de leite',                    'Especial',  16.50),
        (26, 'Paçoca',                           'Especial',  15.00),
        (27, 'Nutella',                          'Especial',  19.50),
        (28, 'Churros',                          'Especial',  18.00),
        (29, 'Red Velvet',                       'Especial',  20.00),
        (30, 'Cheesecake com frutas vermelhas',  'Especial',  21.00);
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