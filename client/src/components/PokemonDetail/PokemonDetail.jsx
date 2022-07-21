import {useState, useEffect} from 'react'
import Header from '../header/Header'
import './PokemonDetail.css'
import { useParams } from 'react-router-dom'
import { getPokemonById } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../Loading/Loading'

const PokemonDetail = () => {
    const state = useSelector(state => state.pokemon)
    const dispatch = useDispatch()
    const { id } = useParams()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
      setLoading(true)
      dispatch(getPokemonById(id))
      setTimeout(() => {
        setLoading(false)
      }, 2000);
    }, [dispatch, id])
    const { types } = state
    

  return (
    <div className='padreDetail'>
      {loading ? <Loading /> : (
        <div className='padreDetail'>

        <Header />
        <div className='pokeDetail'>
          <div className='detail'>
           <h1>{state?.name}</h1>
           <img className="imagen" src={state?.urlImg} alt="img" />
           <div>Types: {types?.map((type) => (
                <h4
                  className='type'
                  key={type}
                >{type} </h4>
           )) }</div>
           <p>Hp: {state?.hp}</p>
           <p>Attack: {state?.attack}</p>
           <p>Defense: {state?.defense}</p>
           <p>Speed: {state?.speed}</p>
           <p>Height:{state?.height}</p>
           <p>Weight: {state?.weight}</p>
           <p>Id: {state?.id}</p>
          </div>

        </div>
        </div>
      )}
    </div>
  )
}

export default PokemonDetail