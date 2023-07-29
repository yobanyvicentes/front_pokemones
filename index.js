let pokemons = [];
const divPokemons = document.querySelector('#grid-div');

const renderPokemons = async (array) => {
  divPokemons.innerHTML = '';
  for (let index = 0; index < array.length; index++) {
    const pokemon = array[index];

    const divPokemon = document.createElement('div');
    divPokemon.className = 'div-pokemon';
    divPokemon.innerHTML = `<p>${pokemon.name}</p>`

    const divTypes = document.createElement('div');
    divTypes.className = 'div-types';

    const detalleURL = pokemon.url;
    const response = await fetch(detalleURL);
    const pokemonDetail = await response.json();
    const types = pokemonDetail.types;

    const picture = pokemonDetail.sprites.back_default;
    divPokemon.innerHTML += `<img src=${picture} />`

    for (let index = 0; index < types.length; index++) {
      const type = types[index];
      divTypes.innerHTML += `<p>${type.type.name}</p>`;
    }

    divPokemon.appendChild(divTypes)
    divPokemons.appendChild(divPokemon);
  }
}


const getPokemons = async () => {
  const URL = 'https://pokeapi.co/api/v2/pokemon?limit=100';

  const res = await fetch(URL);
  const data = await res.json();
  pokemons = data.results;

  //console.log(pokemons);

  renderPokemons(pokemons);
}

getPokemons();
//______________________________________________________________

const inputSearch = document.querySelector('#idSearch-pokemon');

let Searchedpokemons = [];
inputSearch.addEventListener('keyup', () => {
  const inputValue = inputSearch.value;
  Searchedpokemons = pokemons.filter((pokemon)=>{
    if (pokemon.name.includes(inputValue)) {
      return pokemon;
    }
  });
  console.log(Searchedpokemons);
  renderPokemons(Searchedpokemons);
});



