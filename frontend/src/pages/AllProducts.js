import React, { useEffect, useState } from 'react'
import UploadProducts from '../components/UploadProducts'
import { summaryApi } from '../common'
import AdminProductCard from '../components/AdminProductCard'

const AllProducts = () => {
  const[openUploadProduct,setUploadProduct] = useState(false)
  const [allProducts, setAllProducts] = useState([])

  const fetchAllProducts = async()=>{
    const response = await fetch(summaryApi.allProduct.url)
    const dataResponse = await response.json()

    setAllProducts(dataResponse?.data || [])
  }

  useEffect(()=>{
    fetchAllProducts()
  },[])
  return (
    <div>
      <div  className='bg-white m-4 px-4 py-2 flex justify-between items-center'>
          <h2 className='font-bold text-lg '>All Products</h2>
          <button className='border-2 text-red-500 border-red-500 px-4 py-1 rounded-full hover:bg-red-500  hover:text-white transition-all cursor-pointer ' onClick={()=>setUploadProduct(true)}>Upload Product</button>
      </div>

    {/* all products */}
    <div className='flex items-center gap-4 px-4 flex-wrap h-[calc(100vh-190px)] overflow-y-scroll'>
    {
      allProducts.map((product,index)=>{
        return(
            <AdminProductCard data={product} key={index+"allproructs"} fetchData ={fetchAllProducts}/>
        )
      })
    }
    </div>


    {/* Upload Products */}
    {openUploadProduct && 
      <UploadProducts onClose={()=>setUploadProduct(false)} fetchData={fetchAllProducts}/>
    }
    </div>
  )
}

export default AllProducts