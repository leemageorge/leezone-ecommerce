import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from "../helpers/displayCurrency."
import {FaAngleLeft, FaAngleRight} from "react-icons/fa6"
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'


const HorizontalCardProduct = ({category, heading}) => {
    const [data,setData] = useState([])
    const [loading, setLoading] = useState(true)
    const loadingList = new Array(13).fill(null)

    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async(e,id)=>{
      await addToCart(e,id)
      fetchUserAddToCart()
    }

    // const [scroll, setScroll] = useState(0)

    const scrollElement = useRef()

    const fetchData = async()=>{
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)
        setData(categoryProduct?.data)
     
    }

useEffect(()=>{
fetchData()
// eslint-disable-next-line
},[])

const scrollRight = ()=>{
  scrollElement.current.scrollLeft += 300
}

const scrollLeft =()=>{
  scrollElement.current.scrollLeft -=300
}
  return (
    <div className='container mx-auto px-4 my-6 relative'>
        <h2 className='text-2xl font-semibold py-4'>{heading}</h2>
       <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all' ref={scrollElement}>
       <button className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg' onClick={scrollLeft}><FaAngleLeft /></button>
       <button className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg' onClick={scrollRight}><FaAngleRight /></button>
       
       {loading ? (
        loadingList?.map((product, index)=>{
          return(
            <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded shadow flex '>
            <div className='bg-slate-200 h-full min-w-[120px] md:min-w-[145px] p-4 animate-pulse'></div>
            <div className='p-4 w-full grid gap-2'>
              <h2 className="p-1 bg-slate-200 animate-pulse w-full rounded-full"></h2>
              <p  className="p-1 bg-slate-200 animate-pulsew-full rounded-full"></p>
              <div className='flex gap-2'>
                <p className="p-1 bg-slate-200 animate-pulse w-full  rounded-full"></p>
                <p className="p-1 bg-slate-200 animate-pulse w-full rounded-full"></p>
              </div>
              <button className='bg-slate-200 w-full p-1 animate-pulse rounded-full'></button>
            </div>
  
          </div>
          )
        })
   
       ) :
       (
        data?.map((product,index)=>{
          return(
            <Link to={"product/"+product._id} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
            <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] '>
             <img src={product?.productImage[0]} alt =""  className='object-scale-down h-full hover:scale-110 transition-all'/>
            </div>
            <div className='p-4 grid'>
              <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1'>{product?.productName}</h2>
              <p className='capitalize'>{product?.category}</p>
              <div className='flex gap-2'>
                <p className='text-red-500 font-medium'>{ displayINRCurrency(product.sellingPrice) }</p>
                <p className=' text-slate-500 line-through'>{ displayINRCurrency (product.price) }</p>
              </div>
              <button className='text-sm bg-red-500 hover:bg-red-600 text-white py-0.5 px-3 rounded-full'onClick={(e)=>handleAddToCart(e,product?._id)}>Add to Cart</button>
            </div>
        </Link>
          )
        })
       )
      }
      
       </div> 
        
    </div>
  )
}

export default HorizontalCardProduct