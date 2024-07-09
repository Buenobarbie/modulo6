const express = require("express");
const path = require("path")

const app = express();
const port = 3000;

// Define o template utilizado
app.set("view engine", "ejs");
// Defineo caminho ende estarão as views
app.set("views", path.join(__dirname, "views"));

// Define uma pasta que disponibilizará os arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Rotas
app.get("/", (req, res) => {
  console.log("Servidor foi chamado");
  res.render("index", {
    title: "Página inicial"
  });
});

// Disponibiliza o servidor, colocando-o em modo de escuta
app.listen(port, () => {
  console.log(`Server running at ${port}`)
})