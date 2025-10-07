import React, { useRef, useState } from "react";

export const VerifiyOtp  = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  // Handle input change
  const handleChange = (element, index) => {
    const value = element.value.replace(/\D/, ""); // allow only digits
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next box
    if (index < 5 && value) inputRefs.current[index + 1].focus();
  };

  // Handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    if (otpCode.length < 6) {
      alert("Please enter a valid 6-digit code");
      return;
    }
    console.log("OTP Submitted:", otpCode);
    // TODO: Send otpCode to your backend for verification
  };

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
            vengade13@gmail.com
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
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                aria-label={`OTP digit ${index + 1}`}
                required
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

