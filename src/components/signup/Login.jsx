import React, { useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoPersonOutline } from "react-icons/io5";
import { TbPhone } from "react-icons/tb"

export const Login = () => {

    const [eye, setEye] = useState(false)

    const [sign, setSign] = useState(false)

    const [pass, setPass] = useState("text")

    const [username, setUsername] = useState("")

    const [password, setPassword] = useState("")

    const [email, setEmail] = useState("")

    const [phone, setPhone] = useState('')

    const [error, setError] = useState({})

    console.log(error);


    const validateForm = (e) => {
        const err = {}

        console.log("check : ", !sign);


        if (sign) {

            if (!username) {
                err.username = "username fields is required."
            }
            if (!password) {
                err.password = "password fields is required."
            }
            if (!email) {
                err.email = "email fields is required."
            }
            if (!phone) {
                err.phone = "phone fields is required."
            }

        }
        else {
            if (!password) {
                err.password = "password fields is required."
            }
            if (!email) {
                err.email = "email fields is required."
            }

        }


        setError(err)

        return err

    }


    const handleLoginSubmitInputs = (e) => {
        e.preventDefault()

        const errorCheck = validateForm()

        console.log("count : ", Object.values(errorCheck).length);


        if (Object.values(errorCheck).length === 0) {
            console.log(error);


        }

    }
    return (
        <div className='flex items-center justify-center min-h-screen bg-[#eeeffa]' >
            <form action="" onSubmit={handleLoginSubmitInputs} className='w-full max-w-sm lg:max-w-lg bg-white p-5 shadow-sm rounded-xl' >
                {/* login content */}
                <div className="flex flex-col ">
                    <h1 className='text-[24px] font-semibold mb-1' > Login in your Account </h1>
                    <p className='text-sm text-gray-600' > Welcome back! Select method to Log in : </p>

                </div>
                {/* google sign */}

                <div className="flex items-center justify-evenly gap-4 my-5">
                    <div className="flex items-center justify-center py-3 flex-1 gap- rounded-md shadow-sm">
                        <span> <FcGoogle /> </span>
                        <span className='text-sm font-semibold' > Google </span>
                    </div>
                    <div className='flex items-center justify-center py-3 flex-1 gap-2 shadow-sm' >
                        <span className='text-blue-500 ' > <FaFacebook /> </span>
                        <span className='text-sm font-semibold' > Facebook </span>
                    </div>
                </div>

                <p className='text-center my-3 text-gray-400' > continue with with email </p>

                {/* form area */}

                <div className="flex flex-col gap-4">
                    {/* username */}

                    {sign && (<div className="flex flex-col gap-1">
                        <div className="flex items-center px-2 border border-gray-200">
                            <span className='text-2xl mx-2 text-gray-400' > <IoPersonOutline /> </span>
                            <input type="text"
                                className='w-full outline-none py-2 bg-white  placeholder:text-sm placeholder:tracking-wide '
                                placeholder='Username'
                                name='username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />

                        </div>
                        {error.username && <span className='text-red-500 mr-2' > {error.username} </span>}
                    </div>)}



                    {/* Email */}
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center px-2 border border-gray-200 ">
                            <span className='text-2xl mx-2 text-gray-400' > <CiMail /> </span>
                            <input type="text"
                                className='w-full outline-none py-2 bg-white  placeholder:text-sm placeholder:tracking-wide '
                                placeholder='Email'
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        {error.email && <span className='text-red-500' > {error.email} </span>}

                    </div>


                    {/* password */}
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center border px-3  border border-gray-200">
                            <span className='text-2xl mx-[6px] text-gray-400' > <CiLock /> </span>
                            <input type={eye ? "text" : "password"}
                                className='w-full outline-none py-2 bg-white  placeholder:text-sm placeholder:tracking-wide '
                                placeholder='Password'
                                name='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span className='text-gray-400' onClick={() => setEye(!eye)} > {eye ? <MdOutlineRemoveRedEye /> : <FaRegEyeSlash />}  </span>
                        </div>
                        {error.password && <span className='text-red-500' > {error.password}</span>}

                    </div>


                    {/* phone */}

                    {sign && (
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center px-2 border border-gray-200 ">
                                <span className='text-2xl mx-2 text-gray-400' > <TbPhone /> </span>
                                <input type="text"
                                    className='w-full outline-none py-2  placeholder:text-sm placeholder:tracking-wide '
                                    placeholder='Phone'
                                    name='phone'
                                    value={phone}
                                    onChange={(e) => Number(setPhone(e.target.value))}
                                />
                            </div>
                            {error.phone && <span className='text-red-500'> {error.phone} </span>}

                        </div>)}


                    <div className="flex justify-between my-2">
                        <div className="">
                            <input type="checkbox" id='box' /> <label htmlFor="box" className='text-gray-400' > Remember me </label>
                        </div>
                        <div className="">
                            <a href="" className='text-blue-500' > Forgot Password </a>
                        </div>
                    </div>
                    {/* button area */}
                    <button className='w-full py-2 bg-[#dbdcff] text-white font-medium rounded-xl mb-3' > Log in </button>

                    <p className='text-sm text-center' > don't have account ? <span onClick={() => setSign(!sign)} href="" className='text-blue-500 underline text-base/6' > create an account </span> </p>

                </div>
            </form>


        </div>
    )
}
