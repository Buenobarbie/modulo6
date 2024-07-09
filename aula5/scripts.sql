DROP TABLE IF EXISTS alunas;

CREATE TABLE alunas (
    uuid INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL ,
    idade INTEGER,
    username TEXT NOT NULL,
    senha TEXT NOT NULL,
    email TEXT NOT NULL
);

SELECT * FROM alunas;

INSERT INTO alunas (nome, idade, username, senha, email)
VALUES ("Carolina" , "carolina" , "carolina123", "123", "carolina@gmail.com");


UPDATE  alunas SET idade = 36 WHERE uuid = 1;