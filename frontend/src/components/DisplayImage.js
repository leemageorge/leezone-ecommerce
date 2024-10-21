import React from 'react'
import { IoMdClose } from 'react-icons/io'

const DisplayImage = ({imgUrl, onClose}) => {
  return (
  
       <div className='fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center'>
            <div className='bg-white shadow-lg rounded max-w-5xl mx-auto'>
            <div className='text-2xl hover:text-red-500 w-fit ml-auto  cursor-pointer' onClick={onClose} >
                <IoMdClose />
            </div>
                <div className=' flex justify-center items-center p-4 max-w-[500px] max-h-[400px]'>
                   <img src={imgUrl} alt='product' className='w-full h-full ' />  
                </div>
            </div>
       </div>
  
  )
}

export default DisplayImage