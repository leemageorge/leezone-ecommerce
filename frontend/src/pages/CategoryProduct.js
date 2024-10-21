import React, { useEffect, useState } from 'react'
import productCategory from '../helpers/productCategory'
import { summaryApi } from '../common'
import VerticalCard from '../components/VerticalCard'
import { useLocation, useNavigate } from 'react-router-dom'

const CategoryProduct = () => {
  const [data,setData] = useState([])
  const [loading, setLoading] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const urlSearch = new URLSearchParams(location.search)
  const urlSearchListinArray = urlSearch.getAll("category")
  const urlSearchListObject = {}


  urlSearchListinArray.forEach(el=>
  {
   urlSearchListObject[el] = true 
  })



  const [selectCategory, setSelectCategory] = useState(urlSearchListObject)
  const [filterCategoryList, setFilterCategoryList] = useState([])
  const [ sortBy, setSortBy] = useState("")

  const handleOnChangeSortBy = (e)=>{
    const { value } = e.target

    setSortBy(value)
    
    if(value === "asc"){
      setData((prev)=>prev.sort((a,b)=>a.sellingPrice - b.sellingPrice))
    }
    if(value === "desc"){
      setData((prev)=>prev.sort((a,b)=>b.sellingPrice - a.sellingPrice))
    }


  }
  const fetchData = async()=>{
    const response = await fetch(summaryApi.filterProduct.url,{
      method: summaryApi.filterProduct.method,
      headers: {
        "content-type" : "application/json"
      },
      body: JSON.stringify({
        category: filterCategoryList
      })
    
    })
    const dataResponse = await response.json()
    setData(dataResponse.data || [])
  }

  useEffect(()=>{
    fetchData()
  },[filterCategoryList])

  const handleSelectCategory = (e)=>{
    const { name, value, checked } = e.target

   setSelectCategory((prev)=>{
    return{
      ...prev,
      [value] : checked
    }
   })
  }

  useEffect(()=>{
    const arrayOfCategory = Object.keys(selectCategory).map((categoryKeyName)=>{
      if(selectCategory[categoryKeyName]){
          return categoryKeyName
      }
      return null
    }).filter(el=>el)
      setFilterCategoryList(arrayOfCategory)

    //format for url change when change on the checkbox
      const urlFormat = arrayOfCategory.map((el,index)=>{
        if((arrayOfCategory.length-1) === index){
          return `category=${el}`
        }
        return `category=${el}&&`
      })
 
    navigate("/product-category?"+urlFormat.join(""))
    
  },[selectCategory])



  return (
    <div className='container mx-auto p-4'>
      {/* desktop versions */}
      <div className='hidden lg:grid grid-cols-[200px,1fr]'>
        {/* left side */}
        <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>
          {/* sort by */}
          <div>
            <h3 className='uppercase text-base font-medium text-slate-500 pb-1 border-b border-slate-300' >Sort By</h3>
            <form className='text-sm flex flex-col gap-2 py-2'>
              <div className='flex items-center gap-3'>
                <input type='radio' name='sortBy' value={"asc"} checked={sortBy ==='asc'} onChange={handleOnChangeSortBy}/>
                <label>Price - Low to High</label>
              </div>
              <div className='flex items-center gap-3'>
                <input type='radio' name='sortBy' value={"desc"} checked={sortBy === "desc"} onChange={handleOnChangeSortBy}/>
                <label>Price - Hight to Low</label>
              </div>
            </form>
          </div>
            {/* category wise filtering */}
         <div>
          <h3 className='text-base uppercase text-slate-500 border-b border-slate-300 pb-1 font-medium'>Category</h3>
          <form className='text-sm flex flex-col gap-2 py-2 '>
            {
            productCategory.map((categoryName, index)=>{
              return(
                <div className='flex items-center gap-3' key={index}>
                  <input type='checkbox' name={"category"} checked={selectCategory[categoryName?.value]} value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCategory }/>
                  <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                </div>
              )

            })}
          </form>
        </div>     
        {/* display the product */}
        </div>
        <div className='px-4'>   
        <p className='text-lg text-slate-800 font-semibold my-2'>Search Results : {data.length}</p>
        <div className='min-h-[calc(100vh-120px)] max-h-[calc(100vh-120px)] overflow-y-scroll' >
          {
            data.length !== 0 && !loading &&
            (
              <VerticalCard data={data} loading={loading} />
            )
          }
        </div>
        </div> 
      </div>

    </div>
  )
}

export default CategoryProduct