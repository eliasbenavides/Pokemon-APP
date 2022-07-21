import React from 'react'
import { useDispatch } from 'react-redux'
import { createFilter } from '../../redux/actions'


const CreatedFilter = () => {
    const dispatch = useDispatch()

    const createdPokemonsOrApiPokemons = (e) => {
        dispatch(createFilter(e.target.value))
    }



  return (
    <div>
        <select onChange={(e) => {createdPokemonsOrApiPokemons(e)}}>
            <option>Created Or Api</option>
            <option value="created">Created</option>
            <option value="api">Api</option>
        </select>
    </div>
  )
}

export default CreatedFilter    