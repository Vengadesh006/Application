import { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import API from "../Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { EmailVerify } from "../redux/slice/SliceData/VerifyEmail";

export const Email = () => {

    const [email, setEmail] = useState('')

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const emailHandler = async (e) => {
        try{
           const res = await dispatch(EmailVerify({email})).unwrap()
           toast.success(res?.message)
           navigate("/verify-otp")
        }
        catch(err){
            console.log(err)
            toast.error(err)
        }

    }

    const { emailInfo, loading , errors } = useSelector(state => state.emailVerifyStore )

    console.log("email data : ", emailInfo)

    console.log(loading)


  return (
    <div className="w-full">
      {/* Email Input */}
      <div className="flex items-center border border-gray-300 p-2 rounded-2xl my-5 focus-within:border-[#7477c5] transition">
        <span className="text-2xl text-gray-400">
          <MdOutlineEmail />
        </span>
        <input
          type="email"
          className="py-1 w-full outline-none px-2 text-gray-700"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value) }
        />
      </div>

      {/* Button */}
      <button
        className="w-full bg-[#7477c5] hover:bg-[#5d60b3] text-white font-semibold py-2 rounded-md transition"
        onClick={emailHandler}
      >
       { loading ? "Loading.." : "Verify otp" }
      </button>
    </div>
  );
};