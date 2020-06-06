const express = require("express") //importando express
const server = express() //executando o express no servidor

const db = require("./database/db") //importando o banco de dados

//configurando pasta public que contém o CSS
server.use(express.static("public"))

//habilitando o uso do req.body no express
server.use(express.urlencoded({ extended: true }))

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
  //pegando os dados do frontend pela url
  req.query
  
  return res.render("create-point.html")
})

//Pegando os dados do formulario de cadastro de ponto de coleta e inserindo no database
server.post("/savepoint", (req, res) => {
  //INSERIR dados na tabela com sql 
  //Campos da tabela na const query  
  const query = `
    INSERT INTO places (
      image, 
      name,
      address,
      address2,
      state,
      city,
      items
    ) VALUES (?, ?, ?, ?, ?, ?, ?);
  `

  //Valores da tabela na const values
  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items
  ]

  function afterInsertData(err){ //Após inserir o dados no banco de dados executo a função de  callback
      if(err) { //tratamento de erros
        console.log(err)
        res.send("Erro no cadastro")
      }
  
      console.log("Cadastrado com sucesso")
      console.log(this)
      return res.render("create-point.html", { saved: true })
  }

  db.run(query, values, afterInsertData) //passando a função afterInsertData por referencia

})

//Buscar resultados
server.get("/search", (req, res) => {

//Buscando pontos de coleta pela cidade na barra de pesquisa
const search = req.query.search

if (search == "" ){//Se a barra search estiver vazia
  return res.render("search-results.html", { total:0 })//renderiza o html sem mostrar nenhum dado do database
}


//CONSULTAR na tabela se tem dados cadastrados com a cidade pesquisada
  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) { //rows são os registros da tabela 
    if(err) { //tratamento de erros
      return console.log(err)
    }

    const total = rows.length //salvando a quantidade de cars que tenho no banco de dados

    //Renderizando o html com os dados do database
    return res.render("search-results.html", { places:rows, total: total })
  })
})


//iniciando servidor na porta
server.listen(3000)