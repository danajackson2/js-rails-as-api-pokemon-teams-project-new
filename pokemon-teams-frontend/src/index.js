const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
let allPokemons = []

function getTrainers(){
    fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(trainers => trainers.forEach(trainer => renderTrainer(trainer)))
}

function getPokemons(){
    fetch(POKEMONS_URL)
    .then(res => res.json())
    .then(pokemons => pokemons.forEach(p => allPokemons.push(p)))
}

function postPokemon(p){
    fetch(POKEMONS_URL, {
        method: 'POST',
        headers: {'content-type':'application/json'},
        body: JSON.stringify(p)
    })
    .then(res => res.json())
    .then(pokemon => {
        renderPokemon(pokemon)
    })
}

function releasePokemon(pokemon){
    fetch(`${POKEMONS_URL}/${pokemon.id}`, {method:'DELETE'})
    .then(res => res.json())
    .then((msg) => {
        alert(msg['message'])
        document.querySelector(`[data-pokemon-id="${pokemon.id}"]`).parentElement.remove()
    })
}

function addPokemon(e, trainer){
    e.preventDefault()
    let pokemon = {
        species: e.target.querySelector('select').value,
        nickname: e.target.nickname.value,
        trainer_id: trainer.id
    }
    document.querySelector(`[data-id="${trainer.id}"] form`).remove()
    postPokemon(pokemon)
}

function renderTrainer(trainer){
    let div = document.createElement('div')
    div.dataset.id = trainer.id
    div.className = "card"
    let p = document.createElement('p')
    p.textContent = trainer.name
    let addBtn = document.createElement('button')
    addBtn.dataset.trainerId = trainer.id
    addBtn.textContent = "Add Pokemon"
    addBtn.addEventListener('click', () => populateForm(trainer))
    let ul = document.createElement('ul')
    document.querySelector('main').appendChild(div)
    div.append(p, ul, addBtn)
    trainer.pokemons.forEach((pokemon) => {
        renderPokemon(pokemon)
    })
}

function renderPokemon(pokemon){
    let div = document.querySelector(`[data-id="${pokemon.trainer_id}"]`)
    let ul = div.querySelector('ul')
    let li = document.createElement('li')
    li.textContent = `${pokemon.nickname} (${pokemon.species})`
    let releaseBtn = document.createElement('button')
    releaseBtn.textContent = "Release"
    releaseBtn.dataset.pokemonId = pokemon.id
    releaseBtn.style = "float: right; background: red;"
    releaseBtn.addEventListener('click', () => releasePokemon(pokemon))
    li.appendChild(releaseBtn)
    ul.appendChild(li)
}

function populateForm(trainer){
    if (!document.querySelector(`[data-id="${trainer.id}"] form`)){
        if (document.querySelector(`[data-id="${trainer.id}"] ul`).children.length < 6){
            let div = document.querySelector(`[data-id="${trainer.id}"]`)
            let form = document.createElement('form')
            let label1 = document.createElement('label')
            label1.textContent = 'Choose a Species!'
            let select = document.createElement('select')
            allPokemons.forEach(pokemon => {
                let option = document.createElement('option')
                option.value = pokemon.species
                option.textContent = pokemon.species
                select.appendChild(option)
            })
            let br = document.createElement('br')
            let label2 = document.createElement('label')
            label2.textContent = 'Give it a Nickname'
            let input = document.createElement('input')
            input.name = 'nickname'
            let inputS = document.createElement('input')
            inputS.type = 'submit'
            form.append(label1, select, br, label2, input, inputS)
            div.appendChild(form)
            form.addEventListener('submit', (e) => addPokemon(e, trainer))
        } else{
            alert('You are at maximum Pokemon capacity!')
        }
    }
}

getTrainers()
getPokemons()