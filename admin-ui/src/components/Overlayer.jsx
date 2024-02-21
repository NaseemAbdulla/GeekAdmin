import React from 'react'
import {createPortal} from 'react-dom'
import EditAction from './EditAction'

const Overlayer = (Component) => (props) => {
  return createPortal(
    <Component {...props} />,
    document.getElementById("overLayer")
  )
}

export default Overlayer
