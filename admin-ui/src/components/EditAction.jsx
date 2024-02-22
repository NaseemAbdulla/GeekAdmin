// import React from 'react'
import Overlayer from './Overlayer'

function EditAction({userData,setIsOpen,handleEditSubmit}) {

  return (
    <div>
      <h5>Edit Details</h5>
      <form onSubmit={handleEditSubmit}>
         
        Name:<input type='text'
        defaultValue={userData[0]?.name}
        name='name'
        /><br></br>

        Email:<input type='email'
        defaultValue={userData[0]?.email}
        name='email'
        /><br></br>

        Role:<input type='radio'
        defaultValue={userData[0]?.name} name='role' value='admin' defaultChecked={userData[0].role == 'admin'}
        />Admin<br/>

        Role:<input type='radio'
        defaultValue={userData[0]?.name} name='role' value='member' defaultChecked={userData[0].role == 'member'}
        />member<br/>
        <button type='submit'>save</button>
        <button onClick={()=>setIsOpen(false)}>close</button>
      </form>
    </div>
  )
}
export default Overlayer(EditAction)
