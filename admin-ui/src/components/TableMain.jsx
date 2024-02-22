import React, { useEffect, useState } from 'react'
import { fetchUsers } from '../utils/apiCallers/tableApiCaller'
import Table from './Table'
import Pagination from './Pagination'
import { MAX_ROWS } from '../utils/constants/constant'
import EditAction from './EditAction'



const TableMain = () => {
    const [userData, setUserData] = useState([])
    const [displayedData,setDisplayedData] = useState([])
    const [page,setPage]=useState(1)
    const [selectedData,setSelectedData]=useState([])
    const [isOpen,setIsOpen]=useState(false)
    const [currentSelectEdit,setCurrentSelectEdit]=useState(null)

    useEffect(()=>{
        fetchUserData()
    }, [])

    async function fetchUserData() {
        const data = await fetchUsers();
        setUserData(data);
    }

    useEffect(()=>{
        const filteredData = userData.filter((_,index) => (page - 1) * MAX_ROWS <= index && index < page * MAX_ROWS)
        setDisplayedData(filteredData)
    },[page, userData])

    function allSelect(checked){
           if(checked){
            console.log(displayedData)
            setSelectedData(displayedData.map((item) =>item.id))  
            console.log(displayedData)
            
           }
           else{
            setSelectedData([])
           }
       
    }

    function onItemSelect(checked, value){
        if(checked){
            setSelectedData((cur) => [...cur, value])
        } else {
            setSelectedData((cur) => cur.filter((item) => item !== value))
        }
    }

    function deleteSelected(){
        setUserData((cur) => cur.filter((item) => !selectedData.includes(item.id)))
        setSelectedData([])
    }
    function onDelete(id){
        setUserData((curr) => curr.filter((item) => id !== item.id))
    }
    function selectEdit(id){
        setIsOpen(true);
        setCurrentSelectEdit(id)
        console.log(id)

    }
    function handleEditSubmit(e){
        e.preventDefault();
        console.log(userData)
        setUserData((cur) => cur.map((item) => {
            if(item.id === currentSelectEdit){
              return{
                name:e.target.name.value,
                email:e.target.email.value,
                role:e.target.role.value,
                id:item.id
              }
            }else{
                return item
            }
        }))
        setIsOpen(false)
    }
    

    
  return (
    <div>
        <Table data={displayedData} onItemSelect={onItemSelect} onDelete={onDelete} selectEdit={selectEdit} isOpen={isOpen} allSelect={allSelect}/>
        {isOpen && <EditAction  setIsOpen={setIsOpen} userData={userData.filter((item) => item.id === currentSelectEdit)} handleEditSubmit={handleEditSubmit}/>}
        <button disabled={selectedData.length === 0} onClick={deleteSelected}>Delete Selected</button>
        <Pagination 
            totalPages={Math.floor(userData.length / MAX_ROWS)}
            page={page}
            setPage={setPage}
         />

    </div>
  )
}

export default TableMain
