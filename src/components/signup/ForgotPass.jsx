import React, { useState } from "react";
import { MdLockOutline } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../redux/slice/SliceData/changePassword";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ForgotPass = () => {
  const [pass, setPass] = useState(false);

  const [confire, setCom] = useState(false);

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const { emailInfo, loading , errors } = useSelector(state => state.emailVerifyStore )

  const dispatch = useDispatch()

  const navigate = useNavigate()
 
  const handleSubmit = async (e) => {

    e.preventDefault();
    if (!password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    setError("");
    console.log("Password changed:", password);

    const pyaload = {
      email : emailInfo?.email, 
      password
    }

    try{
      const res = await dispatch(updatePassword(pyaload)).unwrap()

      toast.success(res?.message)

      navigate("/")

    }catch(err){
      console.log(err)
    }

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="flex flex-col shadow-2xl p-10 w-full max-w-md rounded-2xl bg-white">
        <h1 className="text-2xl font-semibold text-center mb-4">
          Change Password
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Password */}
          <div className="flex items-center gap-2 border border-gray-300 rounded-2xl px-3 py-2 focus-within:ring-2 focus-within:ring-blue-200">
            <MdLockOutline className="text-gray-400 text-xl" />
            <input
              type={pass ? "text" : "password"}
              className="w-full outline-none text-lg placeholder:text-gray-400"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-label="New password"
            />
            <span
              className="text-gray-400 text-xl cursor-pointer"
              onClick={() => setPass(!pass)}
            >
              {pass ? <IoEyeOutline /> : <FaRegEyeSlash />}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="flex items-center gap-2 border border-gray-300 rounded-2xl px-3 py-2 focus-within:ring-2 focus-within:ring-blue-200">
            <MdLockOutline className="text-gray-400 text-xl" />
            <input
              type={confire ? "text" : "password"}
              className="w-full outline-none text-lg placeholder:text-gray-400"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              aria-label="Confirm password"
            />
            <span
              className="text-gray-400 text-xl cursor-pointer"
              onClick={() => setCom(!confire)}
            >
              {confire ? <IoEyeOutline /> : <FaRegEyeSlash />}
            </span>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 mt-2 rounded-2xl text-xl font-semibold bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition-all"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};
