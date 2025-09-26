import { configureStore } from "@reduxjs/toolkit"
import userReduce from "./slice/SliceData/userSlice"
import loginReduce from "./slice/SliceData/verifyUserSlice"
import userTokenReduce from "./slice/SliceData/userToken"
import userGetReduce from "./slice/SliceData/userGetId"
import updateUserReduce from "./slice/SliceData/updateUser"

const store = configureStore({
    reducer : {
        userStore : userReduce,
        loginStore : loginReduce,
        userTokenStore : userTokenReduce,
        userGetStore : userGetReduce,
        userUpdateStore : updateUserReduce
    }
})

export default store