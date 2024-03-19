import React, { useState } from 'react'
import Checkbox from './Checkbox'
// import Overlayer from './Overlayer'
import './Table.css'

const Table = ({ data,onItemSelect,onDelete,selectEdit,allSelect,selectedData }) => {

  return (
    <>
  
    <table>
        <thead>
            <tr>
                <th><input type='checkbox' onChange={(e)=>allSelect(e.target.checked)} /></th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>             
            </tr>

        </thead>
        <tbody>
            {data.map((item)=>
                <tr key={item.id}>
                    
                    <td><Checkbox onItemSelect={onItemSelect} value={item.id} checked={selectedData.includes(item.id)}/></td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.role}</td>
                    <td>
                        <button onClick={()=>selectEdit(item.id)}>Action</button>
                        <button onClick={() => onDelete(item.id)}>Delete</button>
                   </td>
                </tr>
            )}
        </tbody>
    </table>
    </>
  )
}

export default Table
