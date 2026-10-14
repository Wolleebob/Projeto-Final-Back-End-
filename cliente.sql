CREATE TABLE cliente 
( 
 id INT PRIMARY KEY AUTO_INCREMENT,  
 nome VARCHAR(100) NOT NULL,  
 cpf CHAR(14) NOT NULL UNIQUE,  
 email CHAR(100) NOT NULL UNIQUE,  
 celular VARCHAR(15) NOT NULL,  
 senha VARCHAR(512) NOT NULL
);
DROP TABLE cliente;

INSERT INTO cliente(
    nome, cpf, celular, email, senha
) VALUES (
    "Guilherme", "111.222.333-49",
    "(42)99999-4444", "guilherme2@gmail.com",
    "senha123"
);


INSERT INTO cliente (nome, cpf, email, celular, senha) VALUES
('Ana Silva Santos', '123.456.789-01', 'ana.silva@email.com', '11912345678', 'senha123'),
('Carlos Oliveira Souza', '234.567.890-12', 'carlos.oliveira@email.com', '21923456789', 'senha456'),
('Mariana Ferreira Costa', '345.678.901-23', 'mariana.ferreira@email.com', '31934567890', 'senha789'),
('Roberto Almeida Lima', '456.789.012-34', 'roberto.almeida@email.com', '41945678901', 'senha012'),
('Patricia Gomes Rocha', '567.890.123-45', 'patricia.gomes@email.com', '51956789012', 'senha345'),
('Fernando Santos Pereira', '678.901.234-56', 'fernando.santos@email.com', '61967890123', 'senha678'),
('Juliana Martins Ribeiro', '789.012.345-67', 'juliana.martins@email.com', '71978901234', 'senha901'),
('Ricardo Nunes Carvalho', '890.123.456-78', 'ricardo.nunes@email.com', '81989012345', 'senha234'),
('Camila Dias Alves', '901.234.567-89', 'camila.dias@email.com', '91990123456', 'senha567'),
('Bruno Teixeira Mendes', '012.345.678-90', 'bruno.teixeira@email.com', '11901234567', 'senha890');

SELECT * FROM cliente 

SELECT email, senha FROM cliente WHERE email = "carlos.oliveira@email.com";

SELECT id, nome FROM cliente WHERE id <= 8;

DELETE FROM cliente WHERE id = 27; 

UPDATE cliente 
SET nome = "Guilherme Galvão", email = "g@gmail.com"
WHERE id = 31;

UPDATE cliente 
SET nome = "Guilherme Galvão"
WHERE id = 31 or id = 32;