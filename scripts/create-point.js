
function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]")

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
  .then(res => { //pegando a resposta da promisse
    return res.json() }) //transformado a resposta em json e jogando para outra promisse
  .then( states => { //then da outra promisse com a resposta json em "states"
    for ( const state of states ) { //pega cada estado de estados e joga na variável "state"
      ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>` //mantem os estados que ja tenho no select e para cada estado salvo id no valor e mostro o nome
    }
    
  } )
}

populateUFs()

function getCities(event) { //quando tiver mudança no select é passado o evento "change" para a função
  const citySelect = document.querySelector("select[name=city]")
  const stateInput = document.querySelector("input[name=state]") //selecionando meu input hidden de nome state

  const ufValue = event.target.value //pegando o valor do id do estado e salvando na variavel ufValue
  
  const indexOfSelectedState = event.target.selectedIndex //pegando o numero (index) do estado selecionado
  stateInput.value = event.target.options[indexOfSelectedState].text //colocando no input hidden o texto do numero do estado selecionado
  
  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

  fetch(url) //uso a url com id do estado na promisse
    .then(res => { 
      return res.json() }) //transformo a resposta com os dados das cidades em json
    .then(cities => { //resposta do json com os dados das cidades salvo na variável "cities"
      for (const city of cities) { //para cada cidade da lista de cidades faço isso
        citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
      }

      citySelect.disabled = false //ativando o botão das cidades depois que carregar a lista delas
    })
}

document
  .querySelector("select[name=uf]") //selecionando o campo
  .addEventListener("change", getCities) //quando fizer uma mudança no campo selecionado chamo a função getCities
