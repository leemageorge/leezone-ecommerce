import React, { useContext, useEffect, useState } from 'react'
import { summaryApi } from '../common'
import Context from '../context'
import displayINRCurrency from '../helpers/displayCurrency.'
import { MdDelete } from "react-icons/md";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const Cart = () => {
  const [data,setData] = useState([])
  const [loading,setLoading] = useState(false)
  const context = useContext(Context)
  const loadingList = new Array(context.cartProductCount).fill(null)
  
  const fetchData = async () => {

      const response = await fetch(summaryApi.addToCartProductView.url, {
        method: summaryApi.addToCartProductView.method,
        credentials: "include",
        headers: { 
          "content-type": "application/json"
         },
      });
      
      const responseData = await response.json();
      if (responseData.success) {
        setData(responseData.data);
      } 
    
  }

  const handleLoading = async()=>{
    await fetchData()
  }

  useEffect(()=>{
    setLoading(true)
    handleLoading()
    setLoading(false)
  },[])
  console.log("data", data)

  const increaseQty = async(id,qty)=>{
    const response = await fetch(summaryApi.updateAddToCartProduct.url,{
      method: summaryApi.updateAddToCartProduct.method,
      credentials: "include",
      headers: {
        "content-type" : "application/json"
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1
      })
    
    })
    const responseData = await response.json()
    if(responseData.success){
      fetchData()
    }
  }

  const decreaseQuantity = async(id,qty) =>{
    if(qty >= 2){
      const response = await fetch(summaryApi.updateAddToCartProduct.url,{
        method: summaryApi.updateAddToCartProduct.method,
        credentials: "include",
        headers: {
          "content-type" : "application/json"
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1
        })
      
      })
      const responseData = await response.json()
      if(responseData.success){
        fetchData()
      }
    }
  }

  const deleteCartProduct = async(id)=>{
    const response = await fetch(summaryApi.deleteAddToCartProduct.url,{
      method: summaryApi.deleteAddToCartProduct.method,
      credentials: "include",
      headers: {
        "content-type" : "application/json"
      },
      body: JSON.stringify({
        _id: id
      })
    })
    const responseData = await response.json()

    if(responseData.success){
      fetchData()
      context.fetchUserAddToCart()
    }
  }
  const totalQty = data.reduce((prevValue, currentValue)=>prevValue+currentValue.quantity,0)
  const totalPrice = data.reduce((prevPrice, currentPrice)=>prevPrice +(currentPrice?.quantity * currentPrice.productId.sellingPrice),0)

  const handlePayment = async()=>{
    console.log("Stripe Public Key:", process.env.REACT_APP_STRIPE_PUBLIC_KEY);
    const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
    const response = await fetch(summaryApi.payment.url,{
      method: summaryApi.payment.method,
      credentials: "include",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        cartItems : data
      })
    })
    const responseData = await response.json()
    if(responseData?.id){
     stripePromise.redirectToCheckout({ sessionId: responseData.id })
    }
  }


  return (
    <div className='container mx-auto p-4'>
      <div className='text-center text-lg my-3'>
      {
        data.length === 0 && !loading && (
          <p className='bg-white py-3 w-full text-lg font-semibold rounded'>No Data</p>
        )
      }
      </div>
    
     <div className='flex flex-col lg:flex-row gap-10 lg:justify-between'>
        {/* view product in cart */}
     <div className='w-full max-w-3xl'>
        {
          loading ? (
            loadingList.map((el,index)=>{
              return(
                <div key={el+"Add to cart product"+index} className='w-full bg-slate-200 my-2 border border-slate-300 h-32 animate-pulse transition rounded'>
                </div>

              )
            })
          
        )
          :(
            data.map((product,index)=>{
              return(
                <div className='w-full bg-white rounded h-32 my-2 grid grid-cols-[128px,1fr]' key={product?._id+"Add to cart product"}>
                  <div className='w-32 h-32 bg-slate-200'>
                    <img src={product?.productId.productImage[0]} className='w-full h-full  object-scale-down mix-blend-multiply'/>
                  </div>
                  <div className='px-4 py-2 relative'>
                 {/* delete icons */}
                 <div className='absolute right-0 p-2 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer rounded-full' onClick={()=>deleteCartProduct(product?._id)}>
                 <MdDelete />
                  </div>
                    <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                    <p className='capitalize text-slate-500'>{product?.productId?.category}</p>
                  <div className='flex items-center justify-between'>
                      <p className='text-red-500 font-medium text-lg'>{displayINRCurrency(product?.productId?.sellingPrice)}</p>
                      <p className='text-slate-500 font-semibold text-lg'>{displayINRCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
                    </div>
                    <div className='flex items-center gap-3 mt-1'>
                      <button className='border border-red-500 hover:bg-red-500 hover:text-white w-6 h-6 text-red-500 flex justify-center items-center' onClick={()=>decreaseQuantity(product?._id, product?.quantity)}>-</button>
                      <span>{product?.quantity}</span>
                      <button className='border border-red-500 hover:bg-red-500 hover:text-white w-6 h-6 text-red-500 flex justify-center items-center' onClick={()=>increaseQty(product?._id, product?.quantity)}>+</button>
                    </div>
                    </div>
                </div>
              )
            })
        
        )
        }

      </div>
      {/* Summary */}
      {
        data[0] && (
          <div className='mt-5 lg:mt-0 w-full max-w-sm'>
          {
            loading ? (
              <div className='bg-slate-200 h-32 border border-slate-300 animate-pulse transition rounded'>
              </div>
            ):(
              <div  className='bg-white h-36 rounded'>
                   <h2 className='bg-red-500 text-white text-lg px-4 py-1'>Summary</h2>
                   <div className='flex items-center justify-between gap-2 px-4 text-slate-500 text-lg font-medium'>
                      <p>Quantity</p>
                      <p>{totalQty}</p>
                   </div>
                 
                   <div className='flex items-center justify-between gap-2 px-4 text-slate-500 text-lg font-medium'>
                       <p>Total Price</p>
                       <p>{displayINRCurrency(totalPrice)}</p>
                   </div>
  
                   <div className='px-4 py-2 '>
                   <button className='bg-blue-500 text-white w-full py-1 rounded' onClick={handlePayment}>Payment</button>
                   </div>
              </div>
            )
          }
      
        </div>
        )
      }
    
     </div>
    </div>
  )
}

export default Cart