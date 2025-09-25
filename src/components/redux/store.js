import { configureStore } from "@reduxjs/toolkit"
import userReduce from "./slice/SliceData/userSlice"
import loginReduce from "./slice/SliceData/verifyUserSlice"
import getUserReduce from "./slice/SliceData/getUser"
import userUpdateReduce from "./slice/SliceData/updateUser"
import patchDataReduce from "./slice/SliceData/patchSclice"

const store = configureStore({
    reducer : {
        userStore : userReduce,
        loginStore : loginReduce,
        getUser : getUserReduce,
        updateUser : userUpdateReduce,
        patchStore : patchDataReduce
    }
})

export default store