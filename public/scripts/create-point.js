//DADOS DA ENTIDADE
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

  citySelect.innerHTML = "<option value>Selecione a Cidade</option>" //limpando o select de cidades
  citySelect.disabled = true // bloqueando o select de cidades antes de buscar na api

  fetch(url) //uso a url com id do estado na promisse
    .then(res => { 
      return res.json() }) //transformo a resposta com os dados das cidades em json
    .then(cities => { //resposta do json com os dados das cidades salvo na variável "cities"
      for (const city of cities) { //para cada cidade da lista de cidades faço isso
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
      }

      citySelect.disabled = false //ativando o botão das cidades depois que carregar a lista delas
    })
}

document
  .querySelector("select[name=uf]") //selecionando o campo
  .addEventListener("change", getCities) //quando fizer uma mudança no campo selecionado chamo a função getCities

//ITENS DE COLETA
const itemsToCollect = document.querySelectorAll(".items-grid li") //selecionando todos os li's do documento

for (const item of itemsToCollect) {//para cada item da lista de items faço isso
  item.addEventListener("click", handleSelectedItem) //adicionando o evento de "click" para cada item e referenciando a função
}

const collectedItems = document.querySelector("input[name=items")//selecionando o input escondido de items

let selectedItems = []; //armazenando os itens selecionados

function handleSelectedItem(event) { //quando o evento "click" ocorrer entra na função
  const itemLi = event.target //salvando em variável que o "click" é em um item da lista  
  
  //adicionar ou remover uma classe  
  itemLi.classList.toggle("selected")//se existir já a classe "selected" eu removo, senão eu crio coloco ela
  
  const itemId = itemLi.dataset.id //armazenando o id do item clicado numa variável
  
  //verificar se existem items selecionados, se sim pegar os items selecionados
  const alreadySelected = selectedItems.findIndex( function(item) { //armazenando os items já selecionados na variável. (findIndex busca um index de item)
    const itemFound = item == itemId //verifica se meu item foi selecionado, se sim salva na variável "itemFound"
    return itemFound //retorna "true" ou "false" na variável
  })

  //se o item já estiver selecionado, tirar da seleção
  // -1 significa não selecionado / 0 significa o index do array, ou seja, algum item selecionado
  if(alreadySelected >=0){
    //removendo da seleção
    const filteredItems = selectedItems.filter( item => { //faço um filtro onde fica só os items selecionados
      const itemIsDifferente = item != itemId //se o item clicado é diferente dos itens já selecionados (alreadySelected) eu adiciono no "itemIsDifferente"
      return itemIsDifferente //se o item clicado for diferente ele retorna "true"
    })
    selectedItems = filteredItems //quando filtrar os items selecionados eu coloco eles nos items selecionados
  
  } else {//se o item não estiver selecionado, adicionar a seleção
    selectedItems.push(itemId)//adicionando o item no array
  }

  //atualizando o input escondido com os items selecionados
  collectedItems.value = selectedItems
}
