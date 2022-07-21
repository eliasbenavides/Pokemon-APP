import React from 'react'
import './Card.css'
import { Link } from 'react-router-dom'
const Card = ({name, image, types, id}) => {


  return (
    <Link to={`/pokemon/${id}`} className='caja'  style={{ textDecoration: 'none' }}> 
          <h2>{name}</h2>
          <img className='image' src={image} alt="img" />
          <div className='tipos'>
              {types && types.map((type, index) => (
                  <h5 key={index}className='h5'>{type}</h5>
                  ))}
          </div>  
    </Link>
  )
}

export default Card