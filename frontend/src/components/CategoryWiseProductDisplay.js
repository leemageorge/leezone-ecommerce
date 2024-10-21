import React, { useContext, useEffect, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency.'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'
import scrollTop from '../helpers/scrollTop'

const CategoryWiseProductDisplay = ({category, heading}) => {
    const [data,setData] = useState([])
    const [loading, setLoading] = useState(true)
    const loadingList = new Array(13).fill(null)
    
    const {  fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async(e,id)=>{
        await addToCart(e,id)
        fetchUserAddToCart()
    }

    const fetchData = async()=>{
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)
        console.log("data", categoryProduct.data)
        setData(categoryProduct?.data)

    }

    useEffect(()=>{
        fetchData()
    },[])
    
  return (
    <div className='container mx-auto px-4 my-6'>
        <h2 className='text-2xl font-semibold py-4'>{heading}</h2>
       <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-between md:gap-6 overflow-x-scroll scrollbar-none transition-all'>
        {
          loading ? (
            loadingList.map((product,index)=>{
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
          ) :
          (
            data?.map((product, index)=>{
                return(
                    <Link to={"/product/"+product._id} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow' onClick={scrollTop}>
                    <div className='bg-slate-200 h-48 min-w-[280px] md:min-w-[145px] flex items-center justify-center'>
                        <img src={product.productImage[0]} className='h-full object-scale-down hover:scale-110 transition-all mix-blend-multiply  ' alt='product' />
                    </div>
                    <div className='grid gap-3 p-4'>
                        <h2 className='md:text-lg font-medium text-base text-ellipsis line-clamp-1 text-black'>{product.productName}</h2>
                        <p className='capitalize text-slate-500'>{product?.category}</p>
                        <div className='flex gap-3'>
                        <p className='text-red-500 font-medium'>{ displayINRCurrency(product?.sellingPrice) }</p>
                        <p className='text-slate-500 line-through'>{ displayINRCurrency(product?.price) }</p>
                        </div>
                        <button className='bg-red-500 text-white rounded-full px-3 py-0.5 hover:bg-red-600' onClick={(e)=>handleAddToCart(e,product?._id)}>Add to Cart</button>
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

export default CategoryWiseProductDisplay