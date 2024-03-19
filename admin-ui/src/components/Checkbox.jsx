import React from 'react'

const Checkbox = ({value, onItemSelect,checked,selectedData}) => {
  return (
    <>
        <input type='checkbox' value={value} onChange={(e) => onItemSelect(e.target.checked, value)} checked={checked}/>
    </>
  )
}

export default Checkbox
