const express = require('express');
const app = express();
const path = require('path');

const port = 3000;


//Define o template utilizado
app.set("view engine", "pug");

// Defineo caminho ende estarão as views
app.set("views", __dirname)

app.get('/', (req, res) => {
    //res.sendFile(path.join(__dirname ,"./index.html"));
    res.render("index");
  });

  app.listen(port, () => {
    console.log(`Server running is ${port}`)
});