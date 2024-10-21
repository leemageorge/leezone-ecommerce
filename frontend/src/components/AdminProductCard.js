import React, { useState } from 'react'
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../helpers/displayCurrency.';

const AdminProductCard = ({data, fetchData}) => {
  const[editProductCard, setEditProductCard] = useState(false)

  return (
   
 <div className='bg-white p-4 rounded'>
 <div className='w-40'>
 <div className='w-32 h-32 flex items-center justify-center'>
 <img src={data?.productImage[0]} width={120} height={120} alt={data?.prodcutName} className='mx-auto object-cover w-fit h-full' />
 </div>
  <h2 className='text-ellipsis line-clamp-2'>{data?.productName}</h2>
<div>
  <div>
    {displayINRCurrency(data?.sellingPrice)}
  </div>
<div className='w-fit ml-auto bg-green-200 p-2 rounded-full hover:bg-green-600 hover:text-white cursor-pointer' onClick={()=>setEditProductCard(true)}>
    <MdModeEditOutline />
  </div>
</div>
 </div>
  
    {
      editProductCard && <AdminEditProduct productData = {data} onClose={()=>setEditProductCard(false)} fetchData={fetchData}/>
    } 
  
 </div>
  )
}

export default AdminProductCard