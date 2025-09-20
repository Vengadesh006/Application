import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";


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

                <p> continue with with email </p>

                <div className="">
                    <input type="text" />
                    <input type="password" />
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
