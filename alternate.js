console.log("Connected")

const genbutton = document.getElementById("generator");
let container = document.getElementById('poke-container')

let pokeNames = []

genbutton.addEventListener("click", (event) => {
    resetTeam();
    generateNewTeam();
})

function resetTeam() {
    pokeNames = []
    container.innerHTML = ""

    // reset container
}

function generateNewTeam() {
    const randPokemonId = genRandId();

    fetchRandomPoke(randPokemonId).then ((randPokeData) => {
        pokeNames.push(randPokeData.name)
        const pokeType = randPokeData.types[0].type.name
        
        fetchPokeByType(pokeType).then((pokeData) => {
            createPokeTeam(pokeData)
        })
    })
}

function genRandId() {
    let number = Math.floor(Math.random() * 1025);
    console.log(number)
    return number;
}

async function createPokeTeam(pokeData) {
    populatePokeNames(pokeData)

    for (const pokeName of pokeNames) {
        fetchPokeDataForPokemon(pokeName).then((pokeData) => {
            createPokeCard(pokeData);
        })
    }
}

function populatePokeNames(pokeData) {
    let i = 0
    while (i < 5) {
        const length = pokeData.pokemon.length
        let num = Math.floor(Math.random() * length)
        console.log(pokeData.pokemon[num].pokemon.name)
        pokeNames.push(pokeData.pokemon[num].pokemon.name)
        i++
    }
}

async function fetchRandomPoke(number) {
    console.log('GETRANDOMPOKE')
    return await fetch(`https://pokeapi.co/api/v2/pokemon/${number}/`) 
        .then((resp) => resp.json())
}

async function fetchPokeByType(pokeType) {
    console.log("GET Poke By Type")
    return await fetch(`https://pokeapi.co/api/v2/type/${pokeType}/`)
        .then((resp) => resp.json())
}

async function fetchPokeDataForPokemon(pokemon) {
    return await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then((resp) => resp.json())
}

function createPokeCard(pokeData) {
    console.log("Creating CARD")
    const name = pokeData.name
    console.log(name)
    const spriteURL = pokeData.sprites.front_default;

  // create the elements we need for our card
    let div = document.createElement("div")
    let img = document.createElement("img")
    let h5 = document.createElement("h5")

  // add the data to the card
    h5.className = "uppercase"
    h5.innerText = name;
    img.src = spriteURL;
    div.className = 'pokemon-card'

  // add the h5 and img to the div
    div.appendChild(h5)
    div.appendChild(img)

  // attach the div to my DOM
    container.appendChild(div)
}
