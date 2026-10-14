const db = require("./db")

async function criar_estrutura() {
  try{
    await db.pool.query(`
    DROP TABLE IF EXISTS cliente;
    CREATE TABLE cliente (
        id int NOT NULL AUTO_INCREMENT,
        nome varchar(100) NOT NULL,
        cpf char(14) NOT NULL,
        email char(100) NOT NULL,
        celular varchar(15) NOT NULL,
        senha varchar(512) NOT NULL,
        PRIMARY KEY (id),
        UNIQUE KEY cpf (cpf),
        UNIQUE KEY email (email)
      ) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4;
      INSERT INTO cliente VALUES (33,'Ana Silva Santos','123.456.789-56','ana.sipva@email.com','11912345645','$2b$10$fEZDZNZMUZY9duobB3CIrOiiISNW0n1OJNdInVVUSmhlA4oOciVBy'),(36,'Guilherme Galvao','123.456.789-09','schultze@gmail.com','(42)99966-4444','$2b$10$sbck1lxsctw6kvyRQ99z1eOU7sg/Z8gbvEv5bpByqF.5NWi7UYSSC'),(37,'Guilherme Galvao','123.456.789-07','galvao@gmail.com','(42)99566-4444','$2b$10$fZj.7jVdBKhD4OUYh0Y3EOaGX5DAVTdlKQHT/XJu8AxvH3CwH3TzS');

      `)
    console.log("Migration de estrutura realizada")
    process.exit(0)
  } catch (error) {
      console.log(error)
      process.exit(1)
  }
}

criar_estrutura() 