import React from 'react'
import './header.css'
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <div className='header'>
      <Link to='/' style={{ textDecoration: 'none' }}>
        <h2 className='pokemonAppText'>Pokemon APP</h2>
      </Link>
      <Link to={'/createPokemon'} style={{ textDecoration: 'none' }}>
        <h3 className='text-CreatePokemon'>Create</h3>
      </Link>
      <Link to={'/home'} style={{ textDecoration: 'none' }}>
        <h3 className='text-CreatePokemon'>Home</h3>
      </Link>

    </div>
  )
}

export default Header