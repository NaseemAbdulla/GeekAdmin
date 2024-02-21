import React from 'react'

const Checkbox = ({value, onItemSelect}) => {
  return (
    <>
        <input type='checkbox' value={value} onChange={(e) => onItemSelect(e.target.checked, value)}/>
    </>
  )
}

export default Checkbox
