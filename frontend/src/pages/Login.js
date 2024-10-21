import React, { useContext, useState } from 'react'
import loginIcons from "../assest/assest/signin.gif"
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { summaryApi } from '../common';
import { toast } from 'react-toastify';
import Context from '../context';


const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [data, setData] = useState({
    email:"",
    password: ""
  })
  const navigate = useNavigate()
  const { fetchUserDetails,  fetchUserAddToCart } = useContext(Context)
 
  const handleChange=(e)=>{
    const {name, value }= e.target
    setData((prev)=>{
      return{
        ...prev,
        [name] : value

      }
    })

  }
  const handleSubmit=async(e)=>{
    e.preventDefault()

    const dataresponse = await fetch(summaryApi.signIn.url,{
      method: summaryApi.signIn.method,
      credentials:"include",
      headers:{
        "content-type": "application/json"
      },
      body:  JSON.stringify(data)

    })

    const dataApi = await dataresponse.json()
    if(dataApi.success){
      toast.success(dataApi.message)
      navigate("/")
      fetchUserDetails()
      fetchUserAddToCart()
    }
    if(dataApi.error){
      toast.error(dataApi.message)

    }
 
  }

  

  return (
    <section id="login">
      <div className='container mx-auto p-4'>
        <div className='w-full max-w-sm bg-white mx-auto p-5'> 
             <div className='w-20 h-20 mx-auto'>
             <img src={loginIcons} alt="login Icons" />
             </div>
             <form className='pt-6 flex flex-col gap-4' onSubmit={handleSubmit}>
             <div className='grid'>
             <label>Email :</label>
             <div className='bg-slate-100 p-2'>
             <input 
             type="email" 
             value={data.email}
             name="email"
             placeholder='Enter email' 
             onChange={handleChange}
             className='w-full h-full outline-none bg-transparent'/>
             </div>
           
             </div>
             <div className='grid'>
             <label>Password :</label>
             <div className='bg-slate-100 p-2 flex justify-between items-center'>
             <input 
             type={showPassword ? "text" : "password"} 
             placeholder='Enter password' 
             name='password'
             value={data.password}
             onChange={handleChange}
             className='wfull h-full outline-none bg-transparent' />
              <div className='cursor-pointer text-xl'onClick={()=>setShowPassword((prev)=>!prev)}>
                {  showPassword ? 
                (<FaEyeSlash/> ):
                (<FaEye />)
                }
              </div>
             </div>
                <Link to={"/forgot-password"} className='block w-fit ml-auto mt-4 hover:underline hover:text-red-500'>Forgot Password ?</Link>
             </div>
             <button className='bg-red-500 py-2 px-5 text-white w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Login</button>
             </form>
             <p className='my-4'>Don't have an account?<Link to={"/sign-up"} className='text-red-500 hover:text-red-600 hover:underline' >Sign-up</Link></p>

        </div>

      </div>

    </section>
  )
}

export default Login