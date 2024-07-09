const express = require('express');
const app = express();
const sqlite3 = require("sqlite3")

const db = new sqlite3.Database("database.db")

const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.redirect('/alunos')
})

// Lista todas as alunas cadastradas
app.get('/alunos', function(req, res){
    db.all(
        `SELECT * FROM alunas`, (err, rows) =>{
            if (err)
                return res.json({errorMessage : "Houve um ero ao consultar os dados"});
            return res.json(rows);
        }
    )
});

// Retorna apenas uma aluna através do id - /alunos/3fa48176-e014-11ec-9d64-0242ac120004
app.get('/alunos/:id', (req, res) => {
    const id = req.params.id;

    db.get(
        `SELECT * FROM alunas WHERE uuid = ?`, id, (err, rows) =>{
            if (err)
                return res.json({errorMessage : "Houve um ero ao consultar os dados"});
            return res.json(rows);
        }
    )
});

// Cadastrar uma aluna
app.post('/alunos', (req, res) => {
  if (!req.body || !Object.keys(req.body).length) {
    return res.status(402).json({ errormessage: "Aluna não enviada no corpo da requisição." });
  }

  const { nome, idade, username, senha, email } = req.body;

  if (!nome || !idade || !username || !senha || !email) {
    return res.status(400).json({ errormessage: "Alguns campos obrigatórios não foram enviados." })
  }

  db.run(
    `INSERT INTO alunas (nome, idade, username, senha, email) 
     VALUES (?, ?, ?, ?, ?)`,
    [ nome, idade, username, senha, email ],
    (err) => {
      if (err) {
        return res.status(500).json({
          errorMessage: "Erro ao salvar os dados.",
          err: err
        });
      }

      return res.status(201).json({ successMessage: "Aluna salva com sucesso" });
    }
  );
});

// Exclui uma aluna através do id - /alunos/3fa48176-e014-11ec-9d64-0242ac120004
app.delete('/alunos/:id', (req, res) => {
  
});

// Altera todo o objeto
app.put("/alunos/:id", (req, res) => {
    const idParam = req.params.id;
  
    const { nome, email, senha, idade, username } = req.body;
  
    if (!nome || !email || !senha || !idade || !username) {
      return res.status(402).json({ errormessage: "Alguns campos obrigatórios não foram enviados." });
    }
  
    db.get(
      `SELECT * FROM alunas WHERE uuid = ?`, idParam, (err, row) => {
        if (err) {
        
          return res.status(500).json({ errorMessage: "Houve um erro ao consultar o dado.", err : err });
        }
  
        if (!row) {
          return res.status(404).json({ errormessage: "Aluna não encontrada." });
        }
  
        db.run(
          `UPDATE alunas SET nome = ?, email = ?, senha = ?, idade = ?, username = ?
           WHERE uuid = ?`,
          [ nome, email, senha, idade, username, idParam ],
          (err2) => {
            if (err2) {
              return res.status(500).json({ errorMessage: "Houve um erro ao consultar o dado2." });
            }
            
            return res.status(200).send({sucessMessage : "aluna atualizada com sucesso"});
          }
        );
      }
    );
  });

// Altera apenas as informaçoes passadas
app.patch("/alunos/:id", (req, res) => {
  
});

app.listen(port, () => {
    console.log(`Server running is ${port}`)
});