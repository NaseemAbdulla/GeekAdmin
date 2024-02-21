// import React from 'react'
import Overlayer from './Overlayer'

function EditAction({userData,setIsOpen}) {

  return (
    <div>
      <h5>Edit Details</h5>
      <form>
         
        Name:<input type='text'
        
        
        /><br></br>

        Email:<input type='email'/><br></br>

        Role:<input type='text'/><br/>

        <button>save</button>
        <button>close</button>
      </form>
    </div>
  )
}
export default Overlayer(EditAction)
