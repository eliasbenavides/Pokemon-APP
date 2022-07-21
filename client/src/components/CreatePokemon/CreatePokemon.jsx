import { useState, useEffect } from 'react'
import './CreatePokemon.css'
import Header from '../header/Header'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTypes, createPokemon } from '../../redux/actions'
import Error from '../error/Error'
// import { validator } from '../../utils/validator'



const CreatePokemon = () => {
  const RegExp = /(https?:\/\/.*\.(?:png|jpg|gif))/
  const dispatch = useDispatch();
  const state = useSelector(state => state.types)
  const [array, setArray] = useState([])
  const [activarBoton, setActivarBoton] = useState(false)
  const [error, setError] = useState(false)
  const [errorInfo, setErrorInfo] = useState('')
  const [btnEnviar, setBtnEnviar] = useState(true)
  const [input, setInput] = useState({
    name: '',
    types: '',
    urlImg: '',
    hp: '',
    attack: '',
    defense: '',
    speed: '',
    height: '',
    weight: ''
  })
  const [pokemonACrear, setPokemonACrear] = useState({
    name: '',
    types: array,
    urlImg: '',
    hp: '',
    attack: '',
    defense: '',
    speed: '',
    height: '',
    weight: ''
  })


  
  useEffect(() => {
    dispatch(getAllTypes())
  }, [dispatch])
    
  const pushType = (e) => {
    e.preventDefault()
    setArray([...array, input.types])
    if(array.length > 0){
      setActivarBoton(true)
    }
  }

  // [ ] Altura y peso
  const handleChange = (e) => {
    e.preventDefault()
    setInput((prevState) => {
      return {...prevState, [e.target.name]: e.target.value.trim()}
    })
    const change = {...input, [e.target.name]: e.target.value}
    if(!change.name ){
      setErrorInfo('TODOS LOS CAMPOS SON OBLIGATORIOS')
      setError(true)
      setBtnEnviar(true)
    }
    if(change.name.length > 10){
      setErrorInfo('EL NOMBRE ES MUY LARGO')
    }
    if(RegExp.test(change.urlImg) === false || !change.urlImg){
      setErrorInfo('Url Invalido, prueba con otro')
      setError(true)
      setBtnEnviar(true)
      }
    if(RegExp.test(change.urlImg) === true){
      setError(false)
      setBtnEnviar(true)
    }
    
    if(change.hp > 200 || change.hp < 1){
      setErrorInfo('El hp minimo es 0 y el maximo es 200')
      setError(true)
      setBtnEnviar(true)
    }
    if(change.attack > 200 || change.attack < 1){
      setErrorInfo('El attack minimo es 1 y el maximo es 200')
      setError(true)
      setBtnEnviar(true)
    }
    if(change.defense > 200 || change.defense < 1){
      setErrorInfo('El defense minimo es 1 y el maximo es 200')
      setError(true)
      setBtnEnviar(true)
    }
    if(change.speed > 200 || change.speed < 1){
      setErrorInfo('El speed minimo es 1 y el maximo es 200')
      setError(true)
      setBtnEnviar(true)
    }
    if(change.height > 200 || change.height < 1){
      setErrorInfo('El height minimo es 1 y el maximo es 200')
      setError(true)
      setBtnEnviar(true)
    }
    if(change.weight > 200 || change.weight < 1){
      setErrorInfo('El weight minimo es 1 y el maximo es 200')
      setError(true)
      setBtnEnviar(true)
    }
    if(error === false){
      setBtnEnviar(false)
    }
    
    setPokemonACrear({
      name: input.name,
      types: array,
      urlImg: input.urlImg,
      hp: input.hp,
      attack: input.attack,
      defense: input.defense,
      speed: input.speed,
      height: input.height,
      weight: input.weight 
    })
  }

 const resetTypes = (e) => {
  e.preventDefault()
  setArray([])
  setActivarBoton(false)
 }

  const handleSubmit = (e) => {
    e.preventDefault() 
    console.log(pokemonACrear)
    dispatch(createPokemon(pokemonACrear))
    setInput({
      name: '',
      types: '',
      urlImg: '',
      hp: '',
      attack: '',
      defense: '',
      speed: '',
      height: '',
      weight: ''
    })
    alert('Pokemon Creado Correctamente!')
  }

  return (
    <div className='divPrincipal'>
        <Header />
        <div className='formulario'>
            <div className='forms'>
                <h3>Create a new Pokemon</h3>
              <form onSubmit={(e) => {handleSubmit(e)}}>
                <div className='cajaForm'>
                  <label >Name:</label>
                  <input 
                    className='input'
                    autoComplete='off'
                    type="text" 
                    name='name' 
                    onChange={(e) =>{handleChange(e)}}
                    />
                </div>

                <div className='cajaForm'>
                  <label >Types:</label>
                  <select className='input' name='types' onChange={(e) =>{handleChange(e)}} >
                    {state && state.map((types, index) => (
                      <option 
                        key={types.id}
                        value={types.name}
                      >{types.name}</option>
                    ))}
                  </select> 
                  <input 
                    type="button" 
                    value="Add Type" 
                    onClick={(e) => {pushType(e)}}
                    id="addType"
                    disabled={activarBoton}
                  /> 
                  <input 
                    type="button" 
                    value="Reset Types" 
                    onClick={(e) => {resetTypes(e)}}
                    disabled={!activarBoton}
                  /> 
                  <div className='cajaTypes'>

                    {array && array.map((el, index) => (
                      <h4 
                        key={index}
                        className='h4'
                        >{el}</h4>
                    ))}
                  </div>
                  
                </div>
                
                
                <div className='cajaForm'>
                  <label >Url:</label>
                  <input 
                    className='input'
                    autoComplete='off'
                    type="text" 
                    name='urlImg' 
                    onChange={(e) =>{handleChange(e)}}
                  />
                </div>
                <div className='cajaForm'>
                  <label >Hp:</label>
                  <input 
                    className='input'
                    type="number" 
                    name='hp' 
                    onChange={(e) =>{handleChange(e)}}
                  /> 
                </div>

                <div className='cajaForm'>
                  <label >Attack:</label>
                  <input 
                    className='input'
                    type="number" 
                    name='attack' 
                    onChange={(e) =>{handleChange(e)}}
                  />
                </div>
                <div className='cajaForm'>
                  <label >Defense:</label>
                  <input 
                    className='input'
                    type="number" 
                    name='defense' 
                    onChange={(e) =>{handleChange(e)}}
                  />
                </div>
                <div className='cajaForm'>
                  <label >Speed:</label>
                  <input 
                    className='input'
                    type="number" 
                    name='speed' 
                    onChange={(e) =>{handleChange(e)}}
                  />
                </div>
                <div className='cajaForm'>
                  <label >Height:</label>
                  <input 
                    className='input'
                    type="number" 
                    name='height' 
                    onChange={(e) =>{handleChange(e)}}
                  />
                </div>

                <div className='cajaForm'>
                  <label >Weight:</label>
                  <input 
                    className='input'
                    type="number" 
                    name='weight' 
                    onChange={(e) =>{handleChange(e)}}
                  />
                </div>
                {error ? <Error error={errorInfo}/> : null}
                <button 
                  className='createPokemon'
                  disabled={btnEnviar}
                  >CREATE A NEW POKEMON</button>
              </form>
            </div>
        </div>
    </div>
  )
}

export default CreatePokemon
