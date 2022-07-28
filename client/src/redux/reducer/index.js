import {
  GET_ALL_POKEMONS,
  GET_POKEMON_BY_ID,
  CREATE_POKEMON,
  DELETE_POKEMON,
  GET_ALL_TYPES,
  SORT_FILTER,
  CREATE_FILTER,
  FILTER_BY_TYPES,
  FILTER_ATAQUE,
  FILTRO_CORRECCION
} from '../actions/index'
const initialState = {
  AllPokemons: [],
  pokemons: [],
  pokemon: {},
  types: []
}
const rootReducer = ( state = initialState, action ) => {
  switch(action.type){
    case GET_ALL_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        AllPokemons: action.payload,
        pokemon: {}
      };
    case GET_ALL_TYPES:
      return{
        ...state,
        types: action.payload
      }
    case FILTER_ATAQUE:
      let moreAttack = [...state.pokemons].sort((a, b) => a.attack > b.attack ? -1 : 1)
      let lessAttack = [...state.pokemons].sort((a, b) => a.attack > b.attack ? 1 : -1)
      if(action.payload === 'more'){
        return{
          ...state,
          pokemons: moreAttack
        }
      }
      if(action.payload === 'less'){
        return{
          ...state,
          pokemons: lessAttack 
        }
      }
    case SORT_FILTER: // Orden Alfabetico
      let sortASC = [...state.pokemons].sort((a, b) => a.name > b.name ? 1 : -1)
      let sortDESC = [...state.pokemons].sort((a, b) => a.name > b.name ? -1 : 1)
      if(action.payload === 'asc'){
        return{
          ...state,
          pokemons: sortASC
        }
      }
      if(action.payload === 'desc'){
        return{
          ...state,
          pokemons: sortDESC
        }
      }
    case CREATE_FILTER:
      let created = [...state.AllPokemons].filter((pokemon) => pokemon.createInDb === true)
      let api = [...state.AllPokemons].filter((pokemon) => pokemon.createInDb === false)
      if(action.payload === 'created'){
        return{
          ...state,
          pokemons: created
        }
      }
      if(action.payload === 'api'){
        return{
          ...state,
          pokemons: api
        }
      }
    case FILTER_BY_TYPES:
      if(action.payload === 'types'){
        return{
          ...state,
          pokemons: state.pokemons
        }
      }else{
        let pokemonsFiltered = state.AllPokemons.filter((pokemon) => {
          return pokemon.types.includes(action.payload)
        })
        return {
          ...state,
          pokemons: pokemonsFiltered
        }
      }
    case GET_POKEMON_BY_ID:
      return {
        ...state,
        pokemon: action.payload
      };
    case CREATE_POKEMON:
      return {
        ...state,
        pokemons: [...state.pokemons, {...action.payload}]
      }
    case DELETE_POKEMON:
      return {
        ...state,
        pokemons: state.pokemons.filter((pokemon) => pokemon.id !== action.payload)
      }
    default: 
      return {
        ...state
      }
  }
}
export default rootReducer