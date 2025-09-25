import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../Api";

export const updateUser = createAsyncThunk('/user/thunk', async ({id, token},{ rejectWithValue }) => {
    
    try{
        const res = await API.get(`/auth/signup/${id}`, {
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
       
        return res?.data

    }catch(err){
        return rejectWithValue(err.response?.data || err.message);
    }

})

const userUpdate = createSlice({
    name : "userUpdate",
    initialState : {
        userUpdate : {}, 
        loadings : false,
        errors : null
    },
    extraReducers : (builder) => {
        builder.addCase(updateUser.pending, (state) => {
            state.loading = true
            state.errors = null;
        } )
        .addCase(updateUser.fulfilled, (state, action) => {
            state.userUpdate = action.payload
            console.log(state.userUpdate);
            
            state.errors = null
        })
        .addCase(updateUser.rejected, (state, action) => {
            state.loading = false
            state.errors = action.payload
        })
    }
})

export default userUpdate.reducer;