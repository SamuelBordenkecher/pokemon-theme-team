console.log("Connected")

const genbutn = document.getElementById("generate");
const pokeList = []
genbutn.addEventListener("click", (event) => {
    event.preventDefault();
    genRandInt()
})

function genRandInt(){
    let answer = Math.floor(Math.random() * 100);
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
        const pokeType = pokeData.types.type
        console.log(pokeType)
        getPokebyType(pokeType)

    })
}
function getPokeByType(pokeType) {
    console.log("GET Poke By Type")
    fetch(`https://pokeapi.co/api/v2/type/${pokeType}/`)
    .then((resp) => resp.json())
    .then((pokeData) => {
        let i = 0
        while (i < 4) {
            let num = Math.floor(Math.random() * 10)
            pokeList.push(pokeData.pokemon[num].name)
        }
    createPokeTeam(pokeList)
    })
}
function createTeamDiv(pokeList) {
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

