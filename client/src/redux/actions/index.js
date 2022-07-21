export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";
export const GET_POKEMON_BY_ID = "GET_POKEMON_BY_ID";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const DELETE_POKEMON = "DELETE_POKEMON";
export const GET_ALL_TYPES = "GET_ALL_TYPES";
export const SORT_FILTER = "SORT_FILTER";
export const CREATE_FILTER = "CREATE_FILTER";
export const FILTER_BY_TYPES = "FILTER_BY_TYPES";
export const FILTER_ATAQUE = "FILTER_ATAQUE";
export const FILTRO_CORRECCION = "FILTRO_CORRECCION"



//  PROMISE MODE
//  export const getAllPokemons = (name) => {
//   return (dispatch) => {
//     if(name){
//       const url =`http://localhost:3001/api/pokemons?name=${name}`
//       return fetch(url)
//           .then(response => response.json())
//           .then(data => dispatch({type: GET_ALL_POKEMONS, payload: [data]}))
//           .catch(error => console.log(error))
//     }
//     if(!name){
//       const url = "http://localhost:3001/api/pokemons"
//       return fetch(url)
//             .then(response => response.json()) 
//             .then(data => dispatch({type: GET_ALL_POKEMONS, payload: data}))
//             .catch(error => console.log(error))
//     }
//   }
//  }

// GET ALL POKEMONS
export const getAllPokemons = (name) => {
  return async (dispatch) => {
    try {
      if(name){
        const url = `http://localhost:3001/api/pokemons?name=${name}`
        const response = await fetch(url)
        const pokemons = await response.json()
        return dispatch({type: GET_ALL_POKEMONS, payload: [pokemons]})
      }
      if(!name){
       const url = "http://localhost:3001/api/pokemons"
       const response = await fetch(url)
       const pokemons = await response.json()
       return dispatch({type: GET_ALL_POKEMONS, payload: pokemons})
     }
    } catch (error) {
      console.log(error)
    }
  }
}
export const filtroCorreccion= (click) => {
  return{
    type: FILTRO_CORRECCION,
    payload: click
  }
}

export const filterAttack = (moreOrLessAttack) => { // 'more' or 'less'
  return {
    type: FILTER_ATAQUE,
    payload: moreOrLessAttack
  }
}

export const sortFilter = (sortType) =>{ // 'asc' or 'desc'
  return {
    type: SORT_FILTER,
    payload: sortType
  }
}

export const createFilter = (filter) => { // filter = api or created
  return {
    type: CREATE_FILTER,
    payload: filter
  }
}

export const filterByTypes = (typeAFiltrar) => {
  return {
    type: FILTER_BY_TYPES,
    payload: typeAFiltrar
  }
}




export const getAllTypes = () => {
  return async (dispatch) => {
    try {
      const url = 'http://localhost:3001/api/types'
      const response = await fetch(url)
      const types = await response.json()
      return dispatch( { type: GET_ALL_TYPES, payload: types } )
    } catch (error) {
      console.log(error)
    }
  }
}


// GET POKEMON BY ID
export const getPokemonById = (id) =>{
  return async (dispatch) => {
    try {
      const url = `http://localhost:3001/api/pokemons/${id}`
      const response = await fetch(url)
      const pokemon = await response.json()
      return dispatch({ type: GET_POKEMON_BY_ID, payload: pokemon })
    } catch (error) {
      console.log(error)
    }
  }
}

export const createPokemon = (pokemon) => {
  return async (dispatch) => {
    try {
      const url = "http://localhost:3001/api/pokemons"
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(pokemon),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      const resultado = await response.json()
      return dispatch( { type: CREATE_POKEMON, payload: resultado } )
    } catch (error) {
      console.log(error)
    }
  }
}

export const deletePokemon = (id) => {
  return async (dispatch) => {
    try {
      const url = `http://localhost:3001/api/pokemons/${id}`
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      const pokemonEliminado = await response.json()
      return dispatch( { type: DELETE_POKEMON, payload: pokemonEliminado } )
    } catch (error) {
      console.log(error)
    }

  }
}