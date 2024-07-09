const express = require('express');
const app = express();

const port = 3000;
app.use(express.json());

const ToDoList = [
    {"id" : 001,
    "name" : "Estudar geografia",
    "date" : "02-08-2022"
    }]

// Lista todas as tarefas
app.get('/tarefas', (req, res) => {
  res.json(ToDoList);
});

// Retorna uma tarefa através do id
app.get('/tarefas/:id', (req, res) => {
  const id = req.params.id;

  const tarefa = ToDoList.find(tar => tar.id == id);

  if (!tarefa) {
    return res.status(404).json({ errormessage: "Tarefa não encontrada." });
  }

  res.json(tarefa);
});

// Adicionar uma tarefa
app.post('/tarefas', (req, res) => {
  if (!req.body || !Object.keys(req.body).length) {
    return res.status(404).json({ errormessage: "Tarefa não enviada no corpo da requisição." });
  }

  const novaTarefa = req.body;

  if (!novaTarefa.id || !novaTarefa.name || !novaTarefa.date) {
    return res.status(400).json({ errormessage: "Alguns campos obrigatórios não foram enviados." })
  }

  ToDoList.push(novaTarefa);
  res.json(novaTarefa)
});

// Exclui uma tarefa pelo id
app.delete('/tarefas/:id', (req, res) => {
  const id = req.params.id;

  const index = ToDoList.findIndex(tar => tar.id == id);

  if (index === -1) {
    return res.status(404).json({ errormessage: "Tarefa não encontrada." });
  }

  ToDoList.splice(index, 1);

  res.status(200);
  res.json({ successMessage: "Tarefa excluída com sucesso!" });
});

// Altera uma tarefa inteira
app.put("/alunos/:id", (req, res) => {
  console.log(2)
  const idParam = req.params.id;

  const { nome, email, senha, idade, username } = req.body;

  if (!nome || !email || !senha || !idade || !username) {
    return res.status(402).json({ errormessage: "Alguns campos obrigatórios não foram enviados." });
  }

  db.get(
    `SELECT * FROM alunas WHERE id = ?`, idParam, (err, row) => {
      if (err) {
        return res.status(500).json({ errorMessage: "Houve um erro ao consultar o dado." });
      }

      if (!row) {
        return res.status(404).json({ errormessage: "Aluna não encontrada." });
      }

      db.run(
        `UPDATE alunas SET nome = ?, email = ?, senha = ?, idade = ?, username = ?
         WHERE id = ?`,
        [ nome, email, senha, idade, username, idParam ],
        (err2) => {
          if (err2) {
            return res.status(500).json({ errorMessage: "Houve um erro ao consultar o dado." });
          }
    
          return res.status(204).send("Aluna atualizada");
        }
      );
    }
  );
});

// Altera uma tarefa pelo id
app.patch("/tarefas/:id", (req, res) => {
  const id = req.params.id;

  const index = ToDoList.findIndex(tar => tar.id == id);

  if (index === -1) {
    return res.status(404).json({ errormessage: "Tarefa não encontrada." });
  }

  const tarefaAtualizada = req.body;

  if(!tarefaAtualizada.id != id){
    return res.status(402).json({ errormessage: "Não é possível alterar o id." });
  }

  
  ToDoList[ index ] = { ...ToDoList[ index ], ...tarefaAtualizada };

  res.json(ToDoList[ index ]);
});

app.listen(port, () => {
    console.log(`Server running is ${port}`)
});