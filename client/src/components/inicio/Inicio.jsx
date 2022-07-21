import React from 'react'
import './Inicio.css'
import Img from "../../images/pokebola.png"
import { Link } from 'react-router-dom'

const Inicio = () => {
  return (
    <div className='prueba'>
        <div className='buttom'>
            <Link to={"/home"}>
                <img className='img' src={Img} alt="img" />
            </Link>
        </div>
    </div>
  )
}

export default Inicio