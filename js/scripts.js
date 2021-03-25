let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
          let $row = $(".row");

          let $card = $('<div class="card" style="width:400px"></div>');
          let $image = $(
            '<img class="card-img-top" alt="Card image" style="width:20%" />'
          );
          $image.attr("src", pokemon.imageUrlFront);
          let $cardBody = $('<div class="card-body"></div>');
          let $cardTitle = $("<h4 class='card-title' >" + pokemon.name + "</h4>");
          let $seeProfile = $(
            '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">See Profile</button>'
          );

          $row.append($card);
          //Append the image to each card
          $card.append($image);
          $card.append($cardBody);
          $cardBody.append($cardTitle);
          $cardBody.append($seeProfile);

          $seeProfile.on("click", function (event) {
            showDetails(pokemon);
          });
        });
      }


//     let pokemonList = document.querySelector('.list-group'); // added bootstrap utility class "list-group"
//     let listPokemon = document.createElement('li');
//     listPokemon.classList.add('.list-group-item'); // added bootstrap utility class "list-group-item"
//     let button = document.createElement('button');
//     button.innerText = pokemon.name;
//     button.classList.add('btn,btn-primary'); // added bootstrap utility class "btn btn-primary"
//     listPokemon.appendChild(button);
//     pokemonList.appendChild(listPokemon);
//     button.addEventListener('click', function(event) {
//       showDetails(pokemon);
//     });
//   })
// }

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
      showModal(item);
    });
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrlFront = details.sprites.front_default;
      item.imageUrlBack = details.sprites.back_default;
      item.height = details.height;
      item.weight = details.weight;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showModal(item) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");
    modalTitle.empty();
    modalBody.empty();

    let nameElement = document.createElement('h1');
    nameElement.innerText = item.name;

    let imageElementFront = document.createElement('img');
    imageElementFront.classList.add('modal-img');
    imageElementFront.src = item.imageUrlFront;

    let imageElementBack = document.createElement('img');
    imageElementBack.classList.add('modal-img');
    imageElementBack.src = item.imageUrlBack;

    let heightElement = document.createElement('p');
    heightElement.innerText = 'Height: ' + item.height;

    let weightElement = document.createElement('p');
    weightElement.innerText = 'Weight: ' + item.weight;

    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    }

    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showModal: showModal
    };
  })();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
