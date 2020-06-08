console.log("Hello")
// document.querySelectorAll("form input")

// document
//     .querySelector("select[name=uf]")
//     .addEventListener("change", () => { console.log("Change")})

function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    // .then((res) => {return res.json()})
    .then( res => res.json() )
    .then( states => {
        for( const state of states ){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    const ufValue = event.target.value
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true
    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        for( const city of cities ){
            citySelect.innerHTML += `<option value=${city.nome}>${city.nome}</option>`
        }
        citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

// Items to Collect

const itemsToCollect = document.querySelectorAll(".items-grid li")
for (const items of itemsToCollect) {
    items.addEventListener("click", handleSelectedItem)
}

// att the hidden camp
const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target
    // add or remove a class with JS
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    // add to selection
    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId
        return itemFound
    })

    // remove to selection
    if(alreadySelected >= 0) {
        const filtredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        selectedItems = filtredItems
    }else {
        // add to selection
        selectedItems.push(itemId)
    }
    // att the hidden camp
    collectedItems.value = selectedItems
}