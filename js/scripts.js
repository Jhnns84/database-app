let pokemonRepository = (function () {
  let pokemonList = [
    {
      name: "Houndour",
      height: 2,
      type: ["dark","fire"]
    },
    {
      name: "Butterfree",
      height: 3,
      type: ["bug","flying"]
    },
    {
      name: "Venusaur",
      height: 6,
      type: ["grass","poison"]
    }
  ];

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function addListItem(pokemon) {
    let pokeVariable = document.querySelector('ul');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText=pokemon.name;
    button.classList.add('pokeButton');
    listItem.appendChild(button);
    pokeVariable.appendChild(listItem);
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem
  }


})();

pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon)

  // this code checks for height above 4 and adds a highlight (wow, that's big) to the pokemon
  // if (pokemon.height > 4){
  // document.write(`<p>${pokemon.name} (height: ${pokemon.height}) - Wow, that's big</p>`);
  // }
  // // this code lists all pokemon with a height lower than 4
  // else if (pokemon.height < 4){
  // document.write(`<p>${pokemon.name} (height: ${pokemon.height})</p>`);
  // }
})
