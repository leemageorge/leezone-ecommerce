import React from 'react'
import CANCELIMAGE from "../assest/cancel.gif"
import { Link } from 'react-router-dom'

const Cancel = () => {
  return (
    <div className='bg-slate-200 w-full max-w-md mx-auto flex items-center justify-center flex-col p-4'>
      <img src={CANCELIMAGE} width={150} height={150}/>
      <p className='text-red-500 font-bold text-xl'>Payment cancel</p>
      <Link to={"/cart"} className='mt-5 p-2 px-3 rounded text-red-500 border-2 border-red-500 hover:bg-red-500 hover:text-white'>Go To Cart</Link>
    </div>
  )
}

export default Cancel