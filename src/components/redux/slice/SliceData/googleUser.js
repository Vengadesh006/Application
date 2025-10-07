import {createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import API from "../../../Api"

export const GoogleAuth = createAsyncThunk(
    '/user/google', 
  async (googleInfo, {rejectWithValue }) => {
        console.log(googleInfo);
        
        try{
            const res = await API.post(`/auth/google`, googleInfo )
            console.log(res?.data)
            return res?.data

        }catch(err) {
            return rejectWithValue(resizeBy?.response?.data?.message)
        }
    }
)

const googleUser = createSlice({
    name : "googleUser", 
    initialState : {
        googleData : [], 
        loading : false,
        errors : null
    }, 
    extraReducers : (builder) => {
        builder.addCase(GoogleAuth.pending, (state) => {
            state.loading = true,
            state.errors = null
        })
        .addCase(GoogleAuth.fulfilled, (state, action) => {
            state.googleData = action.payload
            state.loading = false
        })
        .addCase(GoogleAuth.rejected, (state, action) => {
            state.loading = false
            state.errors = action.payload
        })  
    } 
})

export default googleUser.reducer;