import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency.'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'

const VerticalCardProduct = ({category, heading}) => {
    const [data, setdata] = useState([])
    const[loading, setLoading] = useState(true)
    const loadingList = new Array(13).fill(null)

    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async(e,id)=>{
        await addToCart(e,id)
        fetchUserAddToCart()
    }

    const [scroll,setScroll] = useState(0)

    const scrollElement = useRef()

    const fecthData = async()=>{
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)

        setdata(categoryProduct?.data)
    }

    useEffect(()=>{
        fecthData()

    },[])

    const scrollRight = ()=>{
       scrollElement.current.scrollLeft += 300
    }

    const scrollLeft =()=>{
        scrollElement.current.scrollLeft -= 300
    }


  return (
    <div className='container mx-auto px-4 my-6 relative'>
       <h2 className='text-2xl font-medium py-4'>{heading}</h2>
       <div className='flex items-center gap-6 md:gap-6 overflow-scroll scrollbar-none' ref={scrollElement}>
                <button className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg' onClick={scrollLeft}><FaAngleLeft /></button>
                <button className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg' onClick={scrollRight}><FaAngleRight /></button>
        {loading ? 
        (loadingList?.map((product,index)=>{
            return(
                <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'>
                <div className='bg-slate-200 w-full min-w-[280px] md:min-w-[145px] h-48 p-4 animate-pulse'></div>
                <div className='p-4 grid gap-3'>
                    <h2  className='p-1 py-2 animate-pulse bg-slate-200 rounded-full'></h2>
                    <p  className='p-1 py-2 animate-pulse bg-slate-200 rounded-full'></p>
                    <div className='flex w-full gap-2'>
                    <p  className='p-1 py-2 animate-pulse bg-slate-200 rounded-full w-full'></p>
                    <p  className='p-1 py-2 animate-pulse bg-slate-200 rounded-full w-full'></p>
                    </div>
                    <button className='p-1 py-2 animate-pulse bg-slate-200 rounded-full w-full'></button>
                </div>
            </div>

            )
        })

        ) 
        :(  data?.map((product,index)=>{
            return(
                <Link to={"product/"+product._id} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'>
                <div className='bg-slate-200 w-full h-48 min-w-[280px] md:min-w-[145px] flex items-center justify-center p-4'>
                    <img src={product?.productImage[0]} alt="" className='h-full object-scale-down hover:scale-110 transition-all mix-blend-multiply'/>
                </div>
                <div className='p-4 grid gap-3'>
                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                    <p className='capitalize'>{product?.category}</p>
                    <div className='flex gap-2'>
                        <p className='text-red-500 font-medium'>{ displayINRCurrency(product?.sellingPrice) }</p>
                        <p className='text-slate-500 line-through'>{ displayINRCurrency(product?.price) }</p>
                    </div>
                    <button className='bg-red-500 text-white text-sm rounded-full py-0.5 px-3 hover:bg-red-600' onClick={(e)=>handleAddToCart(e,product?._id)}>Add to Cart</button>
                </div>
        
               </Link>
            )
        }))
      }
      

       </div>
   
    </div>
  )
}

export default VerticalCardProduct