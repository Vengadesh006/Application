import { configureStore } from "@reduxjs/toolkit"
import userReduce from "./slice/SliceData/userSlice"
import loginReduce from "./slice/SliceData/verifyUserSlice"
import userGetReduce from "./slice/SliceData/userGetId"
import updateUserReduce from "./slice/SliceData/updateUser"
import filterUserReduce from "./slice/SliceData/filterUser"
import getMemberReduce from "./slice/SliceData/GetMember"

const store = configureStore({
    reducer : {
        userStore : userReduce,
        loginStore : loginReduce,
        userGetStore : userGetReduce,
        userUpdateStore : updateUserReduce, 
        userFilterStore : filterUserReduce, 
        memberStrore : getMemberReduce
    }
})

export default store