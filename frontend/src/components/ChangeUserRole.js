import React, { useState } from 'react'
import ROLE from '../common/role'
import { IoMdClose } from "react-icons/io";
import { summaryApi } from '../common';
import { toast } from 'react-toastify';

const ChangeUserRole = ({name,email,role,onClose,userId,callFunc}) => {
    const [userRole, setUserRole] =useState(role)


    const handleOnChangeSelect =(e)=>{
        setUserRole(e.target.value)
   
    }

    const updateUserRole = async()=>{

      const fetchResponse = await fetch(summaryApi.updateUser.url,{
        method: summaryApi.updateUser.method,
        credentials:"include",
        headers:{
          "content-type": "application/json"
        },
        body:JSON.stringify({
          role: userRole,
          userId: userId
        })
      })
      const responseData = await fetchResponse.json()
      if(responseData.success){
        toast.success(responseData.message)
        onClose()
        callFunc()
      }
      if(responseData.error){
        toast.error(responseData.message)
      }
      console.log("user response", responseData)

    }
  return (
    <div className=' fixed top-0 bottom-0 left-0 right-0 flex justify-between items-center w-full h-full bg-slate-200 bg-opacity-50'>
        <div className='w-full max-w-sm mx-auto bg-white shadow-md p-4'>
            <div>
                <button className='block ml-auto' onClick={onClose}><IoMdClose /></button>
            </div>
            <h1 className='text-lg font-medium pb-4'>Change User Role</h1>
            <p>Name: {name} </p>
            <p>Email: {email}</p>
           <div className='flex items-center justify-between my-4'>
           <p>Role</p>
            <select className='border px-2 py-1' value= {userRole} onChange={handleOnChangeSelect}>
               { Object.values(ROLE).map((el)=>{
                return(
                    <option value={el} key={el}>{el}</option>
                )
               })
              }
            </select>
           </div>
           <button className='bg-red-500 text-white px-4 py-1 rounded-full w-fit mx-auto block hover:bg-red-600 ' onClick={updateUserRole}>Change Role</button>
        </div>
    </div>
  )
}

export default ChangeUserRole