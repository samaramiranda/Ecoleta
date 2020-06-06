const buttonSearch = document.querySelector("#page-home main a") //buscando o botão de pesquisar ponto de coleta
const modal = document.querySelector("#modal") //buscando minha pagina de modal para abrir
const close = document.querySelector("#modal .header a")//buscando meu ícone de "X" no modal para fechar

buttonSearch.addEventListener("click", () => { //chamando a funçao de abrir quando eu clicar no botão de pesquisar
  modal.classList.remove("hide")//removendo a classe "hide" ao modal
})

close.addEventListener("click", () => { //chamando a função de fechar quando clicar no "X"
  modal.classList.add("hide")
})