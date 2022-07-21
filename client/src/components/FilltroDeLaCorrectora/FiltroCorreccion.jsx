import React from 'react'
import { useDispatch } from 'react-redux'
import { filtroCorreccion } from '../../redux/actions/index'

const FiltroCorreccion = () => {
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(filtroCorreccion())
    }


  return (
    <div>
        <form onSubmit={(e) => {handleSubmit(e)}}>

            <button >Correccion</button>
        </form>
    </div>
  )
}

export default FiltroCorreccion