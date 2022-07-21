import React from 'react'
import { useDispatch } from 'react-redux'
import { sortFilter } from '../../redux/actions'
const SortFilter = () => {
  const dispatch = useDispatch()

  const ordenarPokemons = (e) => {
    dispatch(sortFilter(e.target.value))
  }

  return (
    <div>
        <select onChange={(e) => {ordenarPokemons(e)}}>
            <option >alphabet</option>
            <option value="asc">A - Z</option>
            <option value="desc">Z - A</option>
        </select>
    </div>
  )
}

export default SortFilter