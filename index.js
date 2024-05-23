require ("dotenv").config();
const conn = require("./db/conn")

const Usuario =  require("./models/Usuario")

const express = require ("express")

const exphbs = require ("express-handlebars")

  const app = express();

app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")

  app.use(
    express.urlencoded({
      extended: true,
    })
  )

app.use(express.json())

app.get("/", (req, res) =>{
  res.render("home");
})

app.get("/usuarios", async (req, res) =>{

     const usuarios = await Usuario.findAll({ raw: true});

     res.render("usuarios", {usuarios});

}
)

  app.get("/usuarios/novo", (req,res) => {
    res.render("formUsuario")
  })

  app.post("/usuarios/novo" , async(req,res) => {
    const nickname = req.body.nickname;
    const nome = req.body.nome;

    const dadosUsuario = {
      nickname,
      nome,
    };

    const usuario = await Usuario.create(dadosUsuario);
    res.send("Usuário inserido: " + usuario.id)
  });

  app.listen(8000);

conn
  .sync()
  .then(() => {
    console.log("Conectado com sucesso :)");
  })
  .catch((err) => {
    console.log("Erro ao conectar: " + err);
  });


  