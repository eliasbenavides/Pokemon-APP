import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPokemons } from '../../redux/actions'
import Header from '../header/Header'
import Card from '../Card/Card'
import Pagination from '../Pagination/Pagination'
import Search from '../Search/Search'
import SortFilter from '../SortFilter/SortFilter'
import CreatedFilter from '../CreatedFilter/CreatedFilter'
import TypesFilter from '../TypesFilter/TypesFilter'
import Loading from '../Loading/Loading'
import AttackFilter from '../AttackFilter/AttackFilter'
import './Home.css'






const Home = () => {
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [pokemonsPerPage] = useState(12)


  const state = useSelector(state => state.pokemons)
  useEffect(() => {
    setLoading(true)
    dispatch(getAllPokemons())
    setTimeout(() => {
      setLoading(false)
    }, 2000);
  },[dispatch])
 


  //GET CURRENT POST

  const indexOfLastPost = currentPage * pokemonsPerPage; // 12
  const indexOfFirstPost = indexOfLastPost - pokemonsPerPage // 0
  const currentPokemons = state.slice(indexOfFirstPost, indexOfLastPost)

 

  
  //Change Page
  const paginate = (e, pageNumber) => {
    e.preventDefault()
    if(state.length < 2){
      setCurrentPage(1)
    }
    setCurrentPage(pageNumber)
    
  }


    return (
      
    <>
      { loading ? <Loading /> : (
        <div className='padre'>
      <Header />
      <div className='cards'>
        <div className='filtros'>
          <Search setCurrentPage={setCurrentPage} />
          <SortFilter />
          <CreatedFilter />
          <TypesFilter />
          <AttackFilter />

          <h3>3</h3>
        </div>
        {state[0]?.message ? <h3>No Existe ese Pokemon</h3> : (

          <div className='wrap'>
            {currentPokemons?.map((pokemon) => (
                <Card 
                key={pokemon.id}
                  name={pokemon.name}
                  image={pokemon.urlImg}
                  types={pokemon.types}
                  id={pokemon.id}
                  />
                ))
              } 
         
        </div>
      )}
      </div>
      <Pagination 
          pokemonsPerPage={pokemonsPerPage}
          totalPokemons={state.length}
          paginate={paginate}
        />
        
        </div>
      )}
    </>
  )
}


export default Home






