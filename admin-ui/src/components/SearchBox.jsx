import React from 'react'
import './input.css'

const SearchBox = ({handleChange}) => {
  return (
    <div>
      <input type='text' onChange={handleChange} placeholder='Search by name ,email and role' className='inputSearch'/>
    </div>
  )
}

export default SearchBox
