import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getAllPokemons } from '../../redux/actions'

import './Search.css'


const Search = ({ setCurrentPage }) => {
    const dispatch = useDispatch()

    const [data, setData] = useState('')

    const handleOnChange = (e) => {
        e.preventDefault()
        setData({...data, [e.target.name]: e.target.value})
    }


    const handleSubmit = ( e ) => {
        e.preventDefault()
        dispatch(getAllPokemons(data.data))
        setCurrentPage(1)
    }

  return (
    <div>
        <form onSubmit={(e) => handleSubmit(e)}>
            <input 
                type="text"
                name='data' 
                onChange={(e) => {handleOnChange(e)}}
                autoComplete='off'
                className='inputSearch'
            />
            <button className='btnSearch'>Search</button>
        </form>
    </div>
  )
}

export default Search