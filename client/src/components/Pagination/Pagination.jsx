import React from 'react'
import "./Pagination.css"

const Pagination = ({ pokemonsPerPage, totalPokemons, paginate }) => {

  const pageNumbers = [];

  for(let i = 1; i<= Math.ceil(totalPokemons / pokemonsPerPage); i++){
    pageNumbers.push(i)
  }



  return (
    <div className='pagination'>
      <nav className='nav'>
          <ul className='ul'>
             {pageNumbers && pageNumbers.map(number => (
                <li className='li' key={number}>
                      <a className='a' onClick={(e) => {paginate(e, number)}} href="#!">
                          {number}
                      </a>
                  </li>
              ))}
          </ul>
      </nav>
    </div>
  )
}

export default Pagination