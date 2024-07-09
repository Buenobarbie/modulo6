const express = require("express");
const path = require("path")

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));


app.get("/", (req, res) => {
  res.render("index", {
    title: "DB Idiomas",
    links: [
      { href: "/ingles", label: "Inglês"},
      { href: "/espanhol", label: "Espanhol"},
      { href: "/alemao", label: "Alemao"}
    ]
  });
});

app.get("/ingles", (req, res) => {
  res.render("ingles", {
    title: "Inglês",
    links: [
        { href: "/", label: "Página inicial"},
        { href: "/espanhol", label: "Espanhol"},
        { href: "/alemao", label: "Alemao"}
    ]
  });
});

app.get("/espanhol", (req, res) => {
    res.render("espanhol", {
      title: "Espanhol",
      links: [
          { href: "/", label: "Página inicial"},
          { href: "/ingles", label: "Inglês"},
          { href: "/alemao", label: "Alemao"}
      ]
    });
  });

  app.get("/alemao", (req, res) => {
    res.render("alemao", {
      title: "Alemão",
      links: [
          { href: "/", label: "Página inicial"},
          { href: "/espanhol", label: "Espanhol"},
          { href: "/ingles", label: "Inglês"}
      ]
    });
  });


app.listen(port, () => {
  console.log(`Server running at ${port}`)
})