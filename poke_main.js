console.log("Connected")

const genbutton = document.getElementById("generator");
let pokeList = []
genbutton.addEventListener("click", (event) => {
    genRandInt();
})

function genRandInt(){
    console.log("Random INt")
    let answer = Math.floor(Math.random() * 100) + 1;
    console.log(answer)
    getRandomPoke(answer);
}

function getRandomPoke(number) {
    console.log('GETRANDOMPOKE')
    fetch(`https://pokeapi.co/api/v2/pokemon/${number}/`) 
    .then((resp) => resp.json())
    .then ((pokeData) => {
        console.log("GEttingPokeData")
        pokeList.push(pokeData.name)
        console.log(pokeData.name)
        const pokeType = pokeData.types[0].type.name
        console.log(pokeType)
        getPokeByType(pokeType)

    })
}
function getPokeByType(pokeType) {
    console.log("GET Poke By Type")
    fetch(`https://pokeapi.co/api/v2/type/${pokeType}/`)
    .then((resp) => resp.json())
    .then((pokeData) => {
        let i = 0
        while (i < 5) {
            const length = pokeData.pokemon.length
            let num = Math.floor(Math.random() * length)
            console.log(pokeData.pokemon[num].pokemon.name)
            pokeList.push(pokeData.pokemon[num].pokemon.name)
            i++
        }
    createPokeTeam(pokeList)
    })
}
function createPokeTeam(pokeList) {
    console.log('CREATING Poke Team')
    for (const pokemon of pokeList) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then((resp) => resp.json())
        .then((pokeData) => {
            const name = pokeData.name;
            const spriteURL = pokeData.sprites.front_default;
            console.log(`Name: ${name} sprite: ${spriteURL}`)
            createPokeCard(pokeData);
        })
    }
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
    div.style.border = "solid blue 3px"

  // add the h5 and img to the div
      div.appendChild(h5)
      div.appendChild(img)

  // attach the div to my DOM
    const container = document.getElementById('poke-container')
    container.appendChild(div)
}
















// const handleGetPokemon = (event) => {
//     event.preventDefault();
//     console.log('HANLDEGETTIBGPOKE')

//     const formData = new FormData(event.target);
//     console.log(`this is the form data: ${formData}`)
//     const dataObj = Object.fromEntries(formData)
//     console.log(`this is the data obj: ${dataObj}`)
// }


// const getMonster = (monster) => {
//     console.log("Get Monster")
//     fetch(`https://www.dnd5eapi.co/api/2014/monsters/${monster}`)
//     .then((resp) => resp.json())
//     .then((monsterData) => {
//         createMonsterList(monsterData)
//     })

// }

// const createMonsterList = (monsterData) => {
//        const name = monsterData.name;
       
//        h5 = document.getElementById('monsterList');
//        h5.innerText = name
// }




// const getPokemon = (pokemon) => {
//     console.log("Get Pokemon")
//     fetch (`https://pokeapi.co/api/v2/pokemon/clefairy/`)
// }

