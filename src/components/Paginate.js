import React from 'react'
import {Pagination} from 'react-bootstrap'
import {useNavigate} from "react-router-dom"

const Paginate = ({page, pages, keyword = ""}) => {
    const navigate = useNavigate()
    const handleChange = (p) => {
        navigate(keyword ? `/search/${keyword}/page/${p+1}` : `/page/${p+1}`)
    }
    return pages > 1 &&
        <Pagination className='d-flex justify-content-center my-3' >
        {[...Array(pages).keys()].map(p => (
            <p key={p + 1} onClick = {() => handleChange(p)} >
                <Pagination.Item active={p + 1 === page} >
                        {p + 1}
                </Pagination.Item>
            </p>
                
            ) )}
        </Pagination>
}

export default Paginate
// style = {{borderRadius : 0}}