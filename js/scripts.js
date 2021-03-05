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
for (let i = 0; i < pokemonList.length; i++) {
  // this code checks for height above 4 and adds a highlight (wow, that's big) to the pokemon
  if (pokemonList[i].height > 4){
  document.write('<p>' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')' + ' - Wow, that\'s big</p>');
  }
  // this code lists all pokemon with a height lower than 4
  else if (pokemonList[i].height < 4){
  document.write('<p>' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')</p>');
  }
}
