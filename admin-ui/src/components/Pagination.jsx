import React from 'react'

const Pagination = ({totalPages, setPage, page}) => {

  return (
    <div>
        <button
            disabled={page === 1} 
            onClick={() => setPage(1)}
        >
            First
        </button>
        <button
            disabled={page === 1}
            onClick={() => setPage((prev) => --prev)}
        >
            Prev
        </button>
        {[...Array(totalPages + 1).keys()].map((item) =>
            <button key={item} onClick={() => setPage(item + 1)}>
                {item + 1}
            </button>
        )}
        <button 
            disabled={page === totalPages+1}
            onClick={() => setPage((curr) => ++curr)}
        >
            next
        </button>
        <button
            disabled={page === totalPages+1}
            onClick={() => setPage(totalPages + 1)}
        >
            Last
        </button>
    </div>
  )
}

export default Pagination
