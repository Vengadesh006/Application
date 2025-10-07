import React, { useEffect, useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoPersonOutline } from "react-icons/io5";
import { TbPhone } from "react-icons/tb"
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { auth, googleProvide } from "../config/Firebase"
import { signupFetch } from '../redux/slice/SliceData/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { loginFetch } from '../redux/slice/SliceData/verifyUserSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify"
import { GoogleAuth } from '../redux/slice/SliceData/googleUser';


export const Login = () => {

    const [eye, setEye] = useState(false)

    const [sign, setSign] = useState(false)

    const [pass, setPass] = useState("text")

    const [username, setUsername] = useState("")

    const [password, setPassword] = useState("")

    const [email, setEmail] = useState("")

    const [phone, setPhone] = useState('')

    const [error, setError] = useState({})

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const validateForm = (e) => {
        const err = {}

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


    const handleLoginSubmitInputs = async (e) => {

        e.preventDefault()

        const errorCheck = await validateForm()

        if (Object.values(errorCheck).length !== 0) return

        const num = parseInt(phone)

        if (sign) {
            const payload = {
                username,
                password,
                email,
                phone: num,
            };

            console.log(payload)

            try {
                const res = await dispatch(signupFetch(payload)).unwrap();
                console.log("Signup success:", res);
                toast.success(res)

                setUsername("");
                setPassword("");
                setEmail("");
                setPhone("");
            } catch (err) {
                console.error("Signup failed:", err);
                toast.error(err || err.message)

            }
            setSign(!sign)
        }
        else {
            const payload = {
                email: email,
                password: password
            }
            try {
                const storage = await dispatch(loginFetch(payload)).unwrap();

                console.log(storage?.message)

                toast.success(storage?.message)

                localStorage.setItem("token", storage?.token);

                setEmail("")
                setPassword("")
                navigate("/");

            } catch (err) {
                if(err.message) {
                    toast.error("Network Error", err)
                }else {
                    toast.error(err)
                }
             
            }

        }


    }

    const GoogleSignIn = async (e) => {

        console.log("Google Account . ")

        try {
            const result = await signInWithPopup(auth, googleProvide)

            const user = result?.user

            const googleInfo = {
                username: user.displayName,
                email: user.email,
                avatar: user.photoURL,
                socialId: user.uid,
                types: "Google"
            }

            const res = await dispatch(GoogleAuth(googleInfo)).unwrap()

            const token = localStorage.setItem("token", res?.token)

            toast.success("google ", res.message)

            navigate("/")


        } catch (err) {
            console.log(err);
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

                <div className="flex items-center justify-evenly gap-4 my-5" onClick={GoogleSignIn} >
                    <div className="flex items-center justify-center py-3 flex-1 gap-2 rounded-md shadow-sm">
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
                        <div className="flex items-center px-3 border border-gray-200">
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
                    <button className='w-full py-2 bg-[#7477c5]  text-white font-medium rounded-xl mb-3' > Log in </button>

                    <p className='text-sm text-center' > don't have account ?
                        <span onClick={() => setSign(!sign)} href="" className='text-blue-500 underline text-base/6 underline-offset-2' >
                            {!sign ? " create an account" : " login account"} </span>
                    </p>

                </div>
            </form>


        </div>
    )
}
