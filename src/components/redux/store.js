import { configureStore } from "@reduxjs/toolkit"
import userReduce from "./slice/SliceData/userSlice"
import loginReduce from "./slice/SliceData/verifyUserSlice"
import userGetReduce from "./slice/SliceData/userGetId"
import updateUserReduce from "./slice/SliceData/updateUser"
import filterUserReduce from "./slice/SliceData/filterUser"
import getMemberReduce from "./slice/SliceData/GetMember"
import googleReduce from "./slice/SliceData/googleUser"
import VerifyEmailReduce from "./slice/SliceData/VerifyEmail"
import OTPVerifyReduce from "./slice/SliceData/OtpVerify"
import ChangePassword from "./slice/SliceData/changePassword"

const store = configureStore({
    reducer : {
        userStore : userReduce,
        loginStore : loginReduce,
        userGetStore : userGetReduce,
        userUpdateStore : updateUserReduce, 
        userFilterStore : filterUserReduce, 
        memberStrore : getMemberReduce, 
        googleStore : googleReduce, 
        emailVerifyStore : VerifyEmailReduce, 
        OtpVerifyStore : OTPVerifyReduce, 
        chagePasswordStore : ChangePassword
    }
})

export default store