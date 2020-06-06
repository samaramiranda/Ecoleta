const express = require("express") //importando express
const server = express() //executando o express no servidor

//configurando pasta public que contém o CSS
server.use(express.static("public"))

//template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", { //configurando o nunjucks
  express: server,
  noCache: true
})

//configurando rotas
//pagina inicial
server.get("/", (req, res) => {
  return res.render("index.html", { title: "Um titulo" }) //renderizando a pagina index.html utilizando o nunjucks
})

//Criar ponto de coleta
server.get("/create-point", (req, res) => {
  return res.render("create-point.html")
})

//Buscar resultados
server.get("/search", (req, res) => {
  return res.render("search-results.html")
})


//iniciando servidor na porta
server.listen(3000)