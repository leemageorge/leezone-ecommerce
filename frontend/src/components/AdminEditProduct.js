import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage'
import { MdDelete } from "react-icons/md";
import {summaryApi} from "../common/index"
import {toast} from "react-toastify"

const AdminEditProduct = ({onClose, productData, fetchData}) => {
    const [data, setData] = useState({
        ...productData, 
        productName: productData?.productName,
        brandName: productData?.brandName,
        category: productData?.category,
        productImage:productData?.productImage || [],
        description: productData?.description,
        price: productData?.price,
        sellingPrice: productData?.sellingPrice
    })
    const[openFullscreenImage, setOpenFullscreenImage] = useState(false)
    const[fullScreenImage, setFullScreenImage] = useState("")

    const handleOnChange = (e) => {
        const {name,value} = e.target
        setData((prev)=>{
            return{
                ...prev,
                [name]: value
            }
        })
    }

    const handleUploadProduct =async (e)=>{
        const file= e.target.files[0]
        const uploadImageCloudinary = await uploadImage(file)
        setData((prev)=>{
            return{
                ...prev,
                productImage: [...prev.productImage, uploadImageCloudinary.url]
            }
        })

    }
    const handleDeleteProductImage =async(index)=>{
        const newProductImage = [...data.productImage]
        newProductImage.splice(index,1)
        setData((prev)=>{
            return{
                ...prev,
                productImage: [...newProductImage]
            }
        })


    }

    // upload product data form
    const handleSubmit= async(e)=>{
        e.preventDefault()

        const response = await fetch(summaryApi.updateProduct.url,{
            method: summaryApi.updateProduct.method,
            credentials: "include",
            headers:{
                "content-type" : "application/json"
            },
            body: JSON.stringify(data)
        })
        const responseData = await response.json()

        if(responseData.success){
            toast.success(responseData?.message)
            onClose()
            fetchData()
        }
        if(responseData.error){
            toast.error(responseData?.message)
        }
     
    }
  return (
    <div className='fixed left-0 right-0 top-0 bottom-0 w-full h-full flex justify-center items-center  bg-slate-200 bg-opacity-50'>
    <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden '>
        <div className='flex justify-between items-center pb-4 '>
            <h2 className='font-bold text-lg'>Edit Product</h2>
            <div className='text-[24px] hover:text-red-500 cursor-pointer' onClick={onClose} >
                <IoMdClose />
            </div>
        </div>
        <form className='grid gap-2 p-4 overflow-y-scroll h-full ' onSubmit={handleSubmit}>
            <label htmlFor='productName' className='mt-3'>Product Name: </label>
            <input type="text"
                placeholder='Enter product name'
                id="productName"
                name='productName'
                value={data.productName}
                onChange={handleOnChange}
                className='bg-slate-100 border rounded p-3'
            />
            <label htmlFor='brandName' className='mt-3'>Brand Name:</label>
            <input
                type='text'
                placeholder='Enter brand name'
                id='brandName'
                name='brandName'
                value={data.brandName}
                onChange={handleOnChange}
                className='bg-slate-100 border rounded p-3'
            />
            <label htmlFor='category' className='mt-3'>Category:</label>
            <select value={data.category} onChange={handleOnChange} name='category' className='bg-slate-100 border rounded p-3'>
            <option value={""} name="category"   >Select Category</option>
                {
                    productCategory.map((el, index) => {
                        return (
                            <option  value={el.value} key={el.value + index}>{el.label}</option>
                        )
                    })
                }
            </select>
            <label htmlFor='productImage' className='mt-3'>ProductImage:</label>
            <label htmlFor='uploadProductImage'>
            <div className='bg-slate-100 p-3 rounded h-32 flex justify-center items-center cursor-pointer '>
                <div className='text-slate-500 flex justify-center items-center flex-col'>
                <span className='text-4xl' >
                    <FaCloudUploadAlt />
                </span>
                <p className='text-sm'>Upload Image</p>
                <input type='file' id='uploadProductImage' className='hidden' onChange={handleUploadProduct}/>
                </div>
            </div>
            </label>
            <div>
            {
            data?.productImage[0] ? (
                <div className='flex items-center gap-2'>
                    {
                      data.productImage.map((el,index)=>{
                        return(
                          <div className='relative group'>
                              <img 
                                src={el} 
                                alt={el} 
                                width={80} 
                                height={80}  
                                className='bg-slate-100 border cursor-pointer'  
                                onClick={()=>{
                                  setOpenFullscreenImage(true)
                                  setFullScreenImage(el)
                                }}/>

                                <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer' onClick={()=>handleDeleteProductImage(index)}>
                                  <MdDelete/>  
                                </div>
                          </div>
                          
                        )
                      })
                    }
                </div>
            ) : (
              <p className='text-red-600 text-xs'>*Please upload product image</p>
            )
          }
          
      </div>
      <label htmlFor='price' className='mt-3'>Price:</label>
      <input type="number"
        placeholder='Enter price'
        id="price"
        name='price'
        value={data.price}
        onChange={handleOnChange}
        className='bg-slate-100 border rounded p-3'
        required
     />

    <label htmlFor='sellingPrice' className='mt-3'>Selling Price:</label>
      <input type="number"
        placeholder='Enter selling price'
        id="sellingPrice"
        name='sellingPrice'
        value={data.sellingPrice}
        onChange={handleOnChange}
        className='bg-slate-100 border rounded p-3'
        required
     />
       <label htmlFor='description' className='mt-3'>Description:</label>
      <textarea 
      className='h-28 bg-slate-100 border p-1 resize-none' 
      rows={3} 
      placeholder='Enter product description' 
      onChange={handleOnChange}
      name='description'
      value={data.description}
      >

      </textarea>
     


      <button className='px-3 py-2 bg-red-600 text-white mb-10 mt-3 hover:bg-red-700'>Update Product</button>
  </form> 




</div>



{/***display image full screen */}
{
openFullscreenImage && (
  <DisplayImage onClose={()=>setOpenFullscreenImage(false)} imgUrl={fullScreenImage}/>
)
}


</div>
  )
}

export default AdminEditProduct

