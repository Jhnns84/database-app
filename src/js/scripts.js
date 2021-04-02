let pokemonRepository = (function () {
	let pokemonList = [];
	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=50';

	function add(pokemon) {
		if (typeof pokemon === 'object' && 'name' in pokemon) {
			pokemonList.push(pokemon);
		} else {
			console.log('pokemon is not correct');
		}
	}

	function getAll() {
		return pokemonList;
	}

	//  This is the final addListItem-function
	function addListItem(pokemon) {
		pokemonRepository.loadDetails(pokemon).then(function () {
			let pokemonList = document.getElementById('pokeList'); // added bootstrap utility class "list-group"
			let listPokemon = document.createElement('div');
			// listPokemon.classList.add('list-group-item'); // added bootstrap utility class "list-group-item"
			listPokemon.classList.add('col-10');
			listPokemon.classList.add('col-md-4');
			listPokemon.classList.add('col-sm-6');
			// listPokemon.classList.add('col-md-4');
			let button = document.createElement('button');
			button.innerText = pokemon.name;
			button.classList.add('btn');
			button.classList.add('btn-main');
			// button.classList.add('btn-primary');
			button.setAttribute('data-toggle', 'modal');
			button.setAttribute('data-target', '#pokeModal');
			listPokemon.appendChild(button);
			pokemonList.appendChild(listPokemon);
			button.addEventListener('click', function (event) {
				showDetails(pokemon);
			});
		});
	}

	function showDetails(item) {
		pokemonRepository.loadDetails(item).then(function () {
			console.log(item);
			showModal(item);
		});
	}

	function loadList() {
		return fetch(apiUrl)
			.then(function (response) {
				return response.json();
			})
			.then(function (json) {
				json.results.forEach(function (item) {
					let pokemon = {
						name: item.name,
						detailsUrl: item.url,
					};
					add(pokemon);
					console.log(pokemon);
				});
			})
			.catch(function (e) {
				console.error(e);
			});
	}

	function loadDetails(item) {
		let url = item.detailsUrl;
		return fetch(url)
			.then(function (response) {
				return response.json();
			})
			.then(function (details) {
				item.imageUrlFront = details.sprites.front_default;
				item.imageUrlBack = details.sprites.back_default;
				item.height = details.height;
				item.weight = details.weight;
			})
			.catch(function (e) {
				console.error(e);
			});
	}

	function showModal(item) {
		let modalBody = $('.modal-body');
		let modalTitle = $('.modal-title');
		let modalHeader = $('.modal-header');
		modalTitle.empty();
		modalBody.empty();

		let nameElement = document.createElement('h1');
		nameElement.classList.add('modal-text');
		nameElement.innerText = item.name;

		let imageElementFront = document.createElement('img');
		imageElementFront.classList.add('modal-img');
		imageElementFront.src = item.imageUrlFront;

		let imageElementBack = document.createElement('img');
		imageElementBack.classList.add('modal-img');
		imageElementBack.src = item.imageUrlBack;

		let heightElement = document.createElement('p');
		heightElement.classList.add('modal-text');
		heightElement.innerText = 'Height: ' + item.height;

		let weightElement = document.createElement('p');
		weightElement.classList.add('modal-text');
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
		showModal: showModal,
	};
})();

pokemonRepository.loadList().then(function () {
	pokemonRepository.getAll().forEach(function (pokemon) {
		pokemonRepository.addListItem(pokemon);
	});
});
