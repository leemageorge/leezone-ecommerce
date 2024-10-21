import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { summaryApi } from '../common';
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import displayINRCurrency from '../helpers/displayCurrency.';
import VerticalCardProduct from '../components/VerticalCardProduct';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const ProductDetails = () => {

  const [data,setData] = useState({
    productName : "",
    brandName : "",
    category : "",
    productImage : [],
    description : "",
    price : "",
    sellingPrice : ""
  })
  const [loading,setLoading] = useState(true)
  const productImageListLoading = new Array(4).fill(null)
  const [activeImage,setActiveImage] = useState("")

  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x : 0,
    y : 0
  })

  const [zoomImage, setZoomImage] = useState(false)

  const params = useParams();

  console.log("productID", params)

  const fetchProductDetails = async()=>{

    setLoading(true)
    const response = await fetch(summaryApi.productDetails.url,{
      method: summaryApi.productDetails.method,
      headers: {
        "content-type" : "application/json"
      },
      body: JSON.stringify({
        productId : params?.id
      })
    })
    setLoading(false)

    const dataResponse = await response.json()

    setData(dataResponse?.data)
    setActiveImage(dataResponse?.data?.productImage[0])

  }
  const handleMounseEnterProduct =(imgURL)=>{
    setActiveImage(imgURL)
  }

  console.log("data", data)

  useEffect(()=>{
    fetchProductDetails()
  },[params])

  const handleZoomImage =useCallback((e)=>{
    setZoomImage(true)
    const {left, top, width, height} = e.target.getBoundingClientRect()
    console.log("Coorninates" , left,top,width,height)

    const x = (e.clientX - left) / width 
    const y = (e.clientY  - top ) / height

    setZoomImageCoordinate({
      x,
      y
    })
    console.log(x,y)
 
  },[zoomImageCoordinate])
  
  const handleLeaveImageZoom = ()=>{
    setZoomImage(false)
  }
const { fetchUserAddToCart } = useContext(Context)
const navigate = useNavigate()

  const handleAddToCart = async(e,id)=>{
    await addToCart(e,id)
    fetchUserAddToCart()
  }

  const handleBuyProduct = async(e,id)=>{
    await addToCart(e,id)
    fetchUserAddToCart()
    navigate("/cart")
  }

  return (
    <div className='container mx-auto p-4'>

    <div className=' min-h-[200px] flex flex-col lg:flex-row gap-4 '>
      {/* Product Image */}
      <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>

        <div className='h-[300px] w-[300px] lg:w-96 lg:h-96 bg-slate-200 relative'>
           <img src={activeImage} className='h-full w-full object-scale-down mix-blend-multiply cursor-pointer' onMouseMove={handleZoomImage} onMouseLeave={handleLeaveImageZoom} />

           {/* product Image Zoom */}
           {
            zoomImage && (
              <div className='hidden lg:block bg-slate-200 min-h-[400px] min-w-[400px] absolute -right-[510px] -top-0 overflow-hidden'>
              <div className='w-full h-full min-w-[500px] min-h-[400px] mix-blend-multiply scale-150'
               style={{
                backgroundImage: `url(${activeImage})`,
                backgroundRepeat: "no-repeat", 
                backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`
              
              }}>
  
              </div>
             </div>
            )
           }
      
        </div>
        
        <div className='h-full '>
          {
            loading ? (
              <div className='flex gap-2 lg:flex-col h-full overflow-scroll scrollbar-none'>
               {
                productImageListLoading?.map((el,index)=>{
                  return(
                    <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={"loadingImage"+index}>
                    </div>
                  )
                })
               }

              </div>
            ) :(
              <div className='flex gap-2 lg:flex-col h-full overflow-scroll scrollbar-none'>
                {
                  data?.productImage?.map((imgURL,index)=>{
                    return(
                      <div className='h-20 w-20 bg-slate-200 rounded p-2' key={imgURL}>
                        <img src={imgURL} className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer'  onMouseEnter={()=>handleMounseEnterProduct(imgURL)} onClick={()=>handleMounseEnterProduct(imgURL)}/>
                      </div>
                    )
                  })
                }

              </div>
            )
          }
        </div>

      </div>
      {/* product Details */}
      {
        loading ? 
        (
          <div className='grid gap-1 w-full'>
           <p className='bg-slate-200 h-6 lg:h-8 w-full rounded-full inline-block animate-pulse'></p> 
           <h2 className='bg-slate-200 h-6 lg:h-8 w-full rounded-full animate-pulse'></h2>
           <p className='bg-slate-200 h-6 lg:h-8 min-w-[100px] rounded-full animate-pulse w-full'></p>
           <div className='bg-slate-200 h-6 lg:h-8 rounded-full animate-pulse w-full'> 
         
           </div>
           <div className='flex items-center gap-2 h-6 lg:h-8 animate-pulse rounded-full'>
            <p className='bg-slate-200 h-full w-full'></p>
            <p className='bg-slate-200 h-full w-full'></p>
           </div>
           <div className='flex items-center gap-3 my-2'>
            <button className='h-6 lg:h-8 bg-slate-200 rounded-full animate-pulse w-full'></button>
            <button className='h-6 lg:h-8 bg-slate-200 rounded-full animate-pulse w-full'></button>
           </div>
           <div className='w-full  items center'>
            <p className='bg-slate-200 h-6 lg:h-8 animate-pulse rounded-full mb-2'></p>
            <p className='bg-slate-200 h-8 lg:h-12 animate-pulse rounded-full'></p>
           </div>
      </div>
        ):
        (
          <div className='flex flex-col gap-1'>
           <p className='bg-red-200 text-red-500 px-2 w-fit rounded-full inline-block'>{data?.brandName}</p> 
           <h2 className='text-2xl lg:text-4xl font-medium'>{data?.productName}</h2>
           <p className='capitalize text-slate-400'>{data?.category}</p>
           <div className='flex gap-1 items-center text-red-500'> 
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
           <FaStarHalf />
           </div>
           <div className='flex items-center gap-2 text-2xl font-medium my-1 lg:text-3xl'>
            <p className='text-red-500 '>{displayINRCurrency(data?.sellingPrice)}</p>
            <p className='text-slate-400 line-through'>{displayINRCurrency(data?.price)}</p>
           </div>
           <div className='flex items-center gap-3 my-2'>
            <button className='border-2 border-red-500 rounded px-3 py-1  min-w-[120px] text-red-600 font-medium hover:bg-red-500 hover:text-white' onClick={(e)=>handleBuyProduct(e,data?._id)}>Buy</button>
            <button className='border-2 border-red-500 rounded px-3 py-1 min-w-[120px] bg-red-500 text-white  font-medium hover:text-red-500 hover:bg-white' onClick={((e)=>handleAddToCart(e,data?._id))}>Add to Cart</button>
           </div>
           <div>
            <p className='text-slate-500 font-medium my-1'>Description: </p>
            <p>{data?.description}</p>
           </div>
      </div>
        )
      }
  
    </div>

    {
      data.category && (
        <CategoryWiseProductDisplay category={data?.category} heading={"Recommended Products"}/>
      )
    }
    
   
    </div>
  )
}

export default ProductDetails