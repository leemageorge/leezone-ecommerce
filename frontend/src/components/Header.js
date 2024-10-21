import React, { useContext, useState } from 'react'
import Logo from './Logo'
import { FaSearch } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { summaryApi } from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';


const Header = () => {
  const user = useSelector(state => state?.user?.user)
  const [menuDisplay, sestMenuDisplay] = useState(false)
  const context = useContext(Context)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search, setSearch] = useState(searchQuery)

  console.log("search", searchInput?.search.split(('=')[1]))

  const handleLogout = async () => {
    const fetchData = await fetch(summaryApi.userLogout.url, {
      method: summaryApi.userLogout.method,
      credentials: "include"
    })
    const data = await fetchData.json()
    if (data.success) {
      toast.success(data.message)
      dispatch(setUserDetails(null))
      navigate("/")
    }
    if (data.error) {
      toast.error(data.message)
    }

  }

  const handleSearch = (e)=>{
    const { value } = e.target
    setSearch(value)
    if(value){
      navigate(`/search?q=${value}`)
    }else{
      navigate("/search")
    }
  }
  return (
    <header className='h-16 shadow-md bg-white fixed w-full z-40'>
      <div className='h-full container mx-auto flex items-center px-4 justify-between'>
        <Link to={"/"}>
          <Logo w={150} h={100} />
        </Link>
        <div className='hidden lg:flex items-center justify-between w-full max-w-sm border rounded-full focus-within:shadow pl-2'>
          <input type='text' placeholder='Search here...' className='w-full outline-none ' onChange={handleSearch} value={search}/>
          <div className='text-lg bg-red-500 min-w-[50px] h-8 flex items-center justify-center text-white rounded-r-full'>
            <FaSearch />
          </div>
        </div>
        <div className='flex items-center gap-7 '>
          <div className='relative flex justify-center' onClick={()=>sestMenuDisplay((prev)=>!prev)}>
          {  user?._id &&
            (<div className='text-3xl cursor-pointer'>
              {
                user?.profilePic ?
                  (<img src={user.profilePic} alt={user?.name} className='w-10 h10 rounded-full' />) :
                  (<FaRegUserCircle />)
              }

            </div>)
            }
            {
              menuDisplay &&
              (<div className='absolute bg-white p-2 bottom-0 top-11 h-fit shadow-lg rounded'>
                <nav>
                {  user?.role === ROLE.ADMIN &&
                  <Link to={"/admin-panel/all-products"} className='hover:bg-slate-200 p-2 whitespace-nowrap hidden md:block'>Admin panel</Link>
                }
                <Link to={'/order'} className='hover:bg-slate-200 p-2 whitespace-nowrap hidden md:block' >Order</Link>
                </nav>
              </div>)
            }
          </div>
         {
          user?._id && (
            <Link to={"/cart"} className='text-3xl cursor-pointer relative'>
            <span ><FaShoppingCart /></span>
            <p className='text-sm bg-red-500 w-5 h-5 p-1 rounded-full text-white flex items-center justify-center absolute -top-3 -right-4'>{context?.cartProductCount}</p>
          </Link>
          )
         }
          <div>
            {
              user?._id ?
                (<button onClick={handleLogout} className='bg-red-500 py-1 px-3 rounded-full text-white hover:bg-red-600 hover:scale-110'>Logout</button>) :
                (<Link to={"/login"} className='bg-red-500 px-3 py-1 rounded-full text-white hover:bg-red-600 hover:scale-110'> Login</Link>)
            }

          </div>
        </div>
      </div>
    </header>
  )
}

export default Header