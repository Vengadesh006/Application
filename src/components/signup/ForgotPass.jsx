import React, { useState } from 'react'
import { MdLockOutline } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa6";

export const ForgotPass = () => {

    const [pass, setPass] = useState(false)

    const [confire, setCom] = useState(false)

    return (
        <div className='flex items-center justify-center min-h-screen ' >
            <div className="flex flex-col w-[30%] shadow-2xl p-10  rounded-2xl ">
                <h1 className='text-2xl text-center ' > Change password </h1>
                <form action="" className='flex flex-col my-4' >
                    <div 
                    className="flex items-center gap-2 border my-3 px-1 border-gray-300 rounded-2xl
                    "
                    >
                        <span className='text-xl text-gray-400' > <MdLockOutline /> </span>
                        <input type={pass ? "text" : "password"} className='w-full border py-3 border-none outline-none placeholder:text-xl '
                        placeholder='change password'
                        
                        />
                        <span className='text-xl text-gray-400' onClick={() => setPass(!pass)} > {pass ? <IoEyeOutline /> : <FaRegEyeSlash /> } </span>
                    </div>
                    {/* confirm password */}
                    <div 
                    className="flex items-center gap-2 border my-3 px-1 border-gray-300 rounded-2xl
                    "
                    >
                        <span className='text-xl text-gray-400' > <MdLockOutline /> </span>
                        <input type={confire ? "text" : "password"}
                        className='w-full border py-3 border-none outline-none placeholder:text-xl '
                        placeholder='confirm password'
                        
                        />
                        <span className='text-xl text-gray-400' onClick={() => setCom(!confire)} > {confire ? <IoEyeOutline /> : <FaRegEyeSlash /> } </span>
                    </div>

                   
                </form>
                 <button className='w-full py-3 px-4 border rounded-2xl text-xl font-semibold  border-gray-300 ' > Continue </button>
            </div>

        </div>
    )
}
