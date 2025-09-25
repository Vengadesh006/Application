import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../../Api";

export const getUserFetch = createAsyncThunk("signup/thunk", async (token) => {
     
    try{
        const res = await API.get("profile", {
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        
        return res.data

    }catch(err) {
        console.log(err?.message);
        
    }
}) 

const getUserSlice = createSlice({
    name : "profile", 
    initialState : {
        profile : null, 
        loading : false ,
        errors : null
    },
    extraReducers : (builder) => {
        builder.addCase(getUserFetch.pending, (state) => {
            state.loading = true, 
            state.errors = null
        })
        .addCase(getUserFetch.fulfilled, (state, action) => {
            state.profile = action.payload
            state.loading = false
        } )
        .addCase(getUserFetch.rejected, (state, action) => {
            state.loading = false 
            state.errors = action.payload
        })
    }
})

export default getUserSlice.reducer;