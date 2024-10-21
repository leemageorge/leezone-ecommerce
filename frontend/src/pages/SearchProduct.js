import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { summaryApi } from '../common'
import VerticalCard from '../components/VerticalCard'

const SearchProduct = () => {
    const [data, setData] = useState([])
    const [ loading, setLoading] = useState(false)
    const query = useLocation()
    

    const fetchProduct = async()=>{
        setLoading(true)
        const response = await fetch(summaryApi.searchProduct.url+query.search)
        const dataResponse = await response.json()
        setLoading(false)
        
        setData(dataResponse.data)
    }
    useEffect(()=>{
        fetchProduct()
    },[query])
  return (
    <div className='container mx-auto p-4'>
        {
            loading && (
                <p className='text-center text-lg'>Loading...</p>
            )
        }
        <p className='text-lg font-semibold my-3'>Search Results : {data.length}</p>
        {
            data.length === 0 && !loading && (
                <p className='bg-white text-lg text-center p-4'>No Data</p>
            )
        }
        {
            data.length !== 0 && !loading && (
                <VerticalCard loading={loading} data={data}/>
            )
        }
    </div>
  )
}

export default SearchProduct