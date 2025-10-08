import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OtpVerify } from "../redux/slice/SliceData/OtpVerify";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const VerifiyOtp = () => {

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const inputRefs = useRef([]);

  const { emailInfo } = useSelector(state => state.emailVerifyStore)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  useEffect(() => {

    inputRefs.current[0]?.focus();

  }, []);

  const handleChange = (e, index) => {

    const value = e.target.value.replace(/\D/g, "");

    if (value.length > 1) {

      const valueArray = value.split("").slice(0, 6);
      const newOtp = [...otp];
      for (let i = 0; i < valueArray.length; i++) {
        if (index + i < 6) newOtp[index + i] = valueArray[i];
      }
      setOtp(newOtp);


      const nextIndex = Math.min(index + valueArray.length, 5);
      inputRefs.current[nextIndex]?.focus();
    } else {

      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (otp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = async (e, index) => {

    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!pasteData) return;

    const pasteArray = pasteData.split("").slice(0, 6);
    const newOtp = [...otp];

    for (let i = 0; i < pasteArray.length; i++) {
      if (index + i < 6) newOtp[index + i] = pasteArray[i];
    }

    setOtp(newOtp);
    const nextIndex = Math.min(index + pasteArray.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const otpCode = otp.join("");
      if (otpCode.length !== 6) {
        alert("Please enter a valid 6-digit code");
        return;
      }

      const payload = {
        email: emailInfo?.email,
        otp: parseInt(otpCode),
      };

      const res = await dispatch(OtpVerify(payload)).unwrap();
      toast.success(res?.message || "OTP verified successfully!");
      navigate("/chage-password")

    } catch (err) {
      console.log("Error:", err);
      toast.error(err?.message || err?.error || "OTP verification failed!");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="flex flex-col bg-white shadow-2xl p-10 rounded-2xl gap-7 w-full max-w-md">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            Verify Your Email Address
          </h1>
          <p className="text-lg text-gray-600 mt-1">
            Please enter your 6-digit code
          </p>
          <p className="text-blue-600 underline mt-2 text-sm">
            { emailInfo?.email }
          </p>
        </div>

        {/* OTP Inputs */}
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center gap-4 mb-5">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength="1"
                pattern="[0-9]*"
                className="w-12 h-14 border border-gray-300 text-center text-xl rounded-md shadow-md focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={(e) => handlePaste(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
              />
            ))}
          </div>

          {/* Resend OTP */}
          <p className="text-center text-blue-600 underline text-sm cursor-pointer hover:text-blue-800">
            Resend OTP
          </p>

          {/* Continue Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 mt-4 rounded-2xl text-xl font-semibold bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition-all"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};
