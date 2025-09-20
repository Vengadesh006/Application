import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { FaRegEyeSlash } from "react-icons/fa";

export const Login = () => {
  return (
    <div className='flex items-center justify-center min-h-50 border' >
        <form action="" className='w-full max-w-md border' >
            <div className="flex flex-col">
                  <h1 className='text-[24px] font-semibold ' > Login in your Account </h1>
                <p className='text-md text-gray-600' > Welcome back! Select method to Log in : </p>

            </div>
              
                <div className="flex items-center justify-evenly border">
                    <div className="flex items-center border">
                        <span> <FcGoogle /> </span>
                        <span> Google </span>
                    </div>
                    <div className='flex items-center border' >
                        <span> <FaFacebook /> </span>
                        <span> Facebook </span>
                    </div>
                </div>

                <p className='text-center my-5 text-gray-400' > continue with with email </p>

                <div className="flex flex-col gap-4">
                    <div className="flex items-center px-2 border">
                        <span className='text-2xl mx-2' > <CiMail /> </span>
                        <input type="text" 
                        className='w-full border outline-none py-2 '
                        placeholder='Email'
                    />
                    </div>
                    <div className="flex items-center border">
                        <span className='text-2xl mx-2' > <CiLock /> </span>
                         <input type="password" 
                        className='w-full border border-gray-300 outline-none py-2 '
                        placeholder='Password'
                    />
                    <span> <FaRegEyeSlash /> </span>

                    </div>
                    
                    
                    <div className="">
                        <div className=""> 
                            <input type="checkbox" /> <span> Remember me </span>
                        </div>
                        <div className="">
                            <a href=""> Forgot Password </a>
                        </div>
                    </div>
                    <button> Log in </button>
                </div>
        </form>
        

    </div>
  )
}
