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
        setCurrentSelectEdit((curr) => curr.filter((item) => id=== item.id))
        console.log(id)

    }
    

    
  return (
    <div>
        <Table data={displayedData} onItemSelect={onItemSelect} onDelete={onDelete} selectEdit={selectEdit} isOpen={isOpen}/>
        {isOpen && <EditAction  setIsOpen={setIsOpen}/>}
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
