import React, { useState } from 'react'
import loginIcons from "../assest/assest/signin.gif"
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64';
import { summaryApi } from '../common';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: ""
  })
  const navigate = useNavigate()
  const handleChange = (e)=>{
    const{name,value} = e.target
    setData((prev)=>{
        return{
          ...prev,
          [name] : value

        }
    })
  }

  const handleUpload = async(e) =>{
    const file = e.target.files[0]

    const imagePic = await imageTobase64(file)
    setData((prev)=>{
      return{
        ...prev,
        profilePic: imagePic
      }

    })
  }

  const handleSubmit=async (e)=>{
    e.preventDefault();
    if(data.password === data.confirmPassword){
      
    const dataresponse = await fetch(summaryApi.signUP.url, {
      method: summaryApi.signUP.method,
      headers: {
        "content-type" : "application/json"
      },
      body: JSON.stringify(data)
    })
    const dataApi = await dataresponse.json()
    if(dataApi.success){
      toast.success(dataApi.message)
      navigate("/login")
    }
    if(dataApi.error){
      toast.error(dataApi.message)
    }
    
    }else{
      toast.error("please check password and confirm password")
    }

  }
  return (
    <section id="signup">
    <div className='container mx-auto p-4'>
      <div className='w-full max-w-sm bg-white mx-auto p-5'> 
           <div className='w-20 h-20 mx-auto relative rounded-full overflow-hidden'>
          <div>
          <img src={data.profilePic ||loginIcons} alt="login Icons" />
          </div>
          <form>
            <label>
            <div className='bg-slate-100 text-center text-xs pb-6 pt-2 absolute bottom-0 w-full bg-opacity-70 cursor-pointer font-bold '>
            Upload Photo
          </div>
          <input type='file' className='hidden' onChange={handleUpload}/>

            </label>
          </form>
        
           </div>
           <form className='pt-6 flex flex-col gap-4' onSubmit={handleSubmit}>
           <div className='grid'>
           <label>Name :</label>
           <div className='bg-slate-100 p-2'>
           <input 
           type="text" 
           value={data.value}
           name="name"
           placeholder='Enter name' 
           onChange={handleChange}
           required
           className='w-full h-full outline-none bg-transparent'/>
           </div>
         
           </div>
           <div className='grid'>
           <label>Email :</label>
           <div className='bg-slate-100 p-2'>
           <input 
           type="email" 
           value={data.value}
           name="email"
           placeholder='Enter email' 
           onChange={handleChange}
           required
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
           required
           className='wfull h-full outline-none bg-transparent' />
            <div className='cursor-pointer text-xl'onClick={()=>setShowPassword((prev)=>!prev)}>
              {  showPassword ? 
              (<FaEyeSlash/> ):
              (<FaEye />)
              }
            </div>
           </div>
           </div>
           <div className='grid'>
           <label>Confirm Password :</label>
           <div className='bg-slate-100 p-2 flex justify-between items-center'>
           <input 
           type={showConfirmPassword ? "text" : "password"} 
           placeholder='Enter Conform Password' 
           name='confirmPassword'
           value={data.confirmPassword}
           onChange={handleChange}
           required
           className='wfull h-full outline-none bg-transparent' />
            <div className='cursor-pointer text-xl'onClick={()=>setShowConfirmPassword((prev)=>!prev)}>
              {  showConfirmPassword ? 
              (<FaEyeSlash/> ):
              (<FaEye />)
              }
            </div>
           </div>
         
           </div>
           <button className='bg-red-500 py-2 px-5 text-white w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Sign Up</button>
           </form>
           <p className='my-4'>Already have an account?<Link to={"/login"} className='text-red-500 hover:text-red-600 hover:underline' >Login</Link></p>

      </div>

    </div>

  </section>
  )
}

export default SignUp