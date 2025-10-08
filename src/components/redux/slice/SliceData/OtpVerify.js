import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../Api";

export const OtpVerify = createAsyncThunk('/user/otp',async (payload , {rejectWithValue }) => {
    try{
        const { data } =await API.post("/auth/otp", payload )
        
        return data

    }catch(err){
        return rejectWithValue(err.response?.data)
    }
})


const OTPVerify = createSlice({

    name: "email",
    initialState: {
        otpData: null,
        loading: false,
        errors: null
    },

    extraReducers: (builder) => {
        builder.addCase(OtpVerify.pending, (state) => {
            state.loading = true;
            state.errors = null
        })
            .addCase(OtpVerify.fulfilled, (state, action) => {
                state.emailInfo = action.payload
                state.loading = false
            })
            .addCase(OtpVerify.rejected, (state, action) => {
                state.loading = false
                state.errors = action.payload
            })
    }

})

export default OTPVerify.reducer;
