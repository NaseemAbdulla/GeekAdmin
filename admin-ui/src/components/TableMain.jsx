import React, { useEffect, useState } from 'react'
import { fetchUsers } from '../utils/apiCallers/tableApiCaller'
import Table from './Table'
import Pagination from './Pagination'
import { MAX_ROWS } from '../utils/constants/constant'
import EditAction from './EditAction'
import SearchBox from './SearchBox'



const TableMain = () => {
    const [userData, setUserData] = useState([])
    const [displayedData,setDisplayedData] = useState([])
    const [page,setPage]=useState(1)
    const [selectedData,setSelectedData]=useState([])
    const [isOpen,setIsOpen]=useState(false)
    const [currentSelectEdit,setCurrentSelectEdit]=useState(null)
    const [search,setSearch] = useState([])
    const [totalPage,setTotalPage]=useState(-1)


    useEffect(()=>{
        fetchUserData()
    }, [])

    async function fetchUserData() {
        const data = await fetchUsers();
        setUserData(data);
        setTotalPage(Math.floor(data.length / MAX_ROWS))
    }

    useEffect(()=>{
        let filteredData=[]
        console.log(search)
        if(search.length !== 0){
            const data = userData.filter((item) => search.includes(item.id))
            setTotalPage(Math.floor(data.length / MAX_ROWS))
            filteredData = data.filter((item,index) => (page - 1) * MAX_ROWS <= index && index < page * MAX_ROWS )
        }else{
            filteredData = userData.filter((item,index) => (page - 1) * MAX_ROWS <= index && index < page * MAX_ROWS)
            setTotalPage(Math.floor(userData.length / MAX_ROWS))
        }
        setDisplayedData(filteredData)
        
    },[page, userData,search])

    function allSelect(checked){
           if(checked){
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
    function handleChange(e){
        const key=e.target.value;
        const result=userData.filter((item) => item.name.toLowerCase().includes(key) || item.email.toLowerCase().includes(key) || item.role.toLowerCase().includes(key)).map((item) => item.id);
        setSearch(result)
        setPage(1)
    }
    

    
  return (
    <div>
        <SearchBox handleChange={handleChange}/>
        <Table data={displayedData} onItemSelect={onItemSelect} onDelete={onDelete} selectEdit={selectEdit} isOpen={isOpen} allSelect={allSelect} selectedData={selectedData}/>
        {isOpen && <EditAction  setIsOpen={setIsOpen} userData={userData.filter((item) => item.id === currentSelectEdit)} handleEditSubmit={handleEditSubmit}/>}
        <button disabled={selectedData.length === 0} onClick={deleteSelected}>Delete Selected</button>
      {totalPage >=0 &&   <Pagination 
            totalPages={totalPage}
            page={page}
            setPage={setPage}
         />
      }

    </div>
  )
}

export default TableMain
