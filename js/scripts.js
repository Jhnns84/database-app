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

// this function logs the details of the pokemon object that's passed as a parameter
  function showDetails(pokemon) {
    console.log(pokemon);
  }

// this function creates buttons for each pokemon object
  function addListItem(pokemon) {
    let pokeVariable = document.querySelector('ul');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText=pokemon.name;
    button.classList.add('pokeButton');
    //this event listener triggers the showDetails function when a button is clicked
    button.addEventListener('click', function (event) {
      showDetails(pokemon)
    });
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

})
