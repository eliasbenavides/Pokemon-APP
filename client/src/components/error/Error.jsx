import React from 'react'
import './Error.css'

const Error = ({error}) => {
  return (
    <div className='error'>
        <p className='textError'>
            {error}
        </p>
    </div>
  )
}

export default Error