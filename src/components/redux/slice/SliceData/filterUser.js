import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../Api";

export const FILTER_USER = createAsyncThunk('filter/data', async ({text, token}, {rejectWithValue}) => {

    try{
        const res = await API.post('/filter/user', { "username" : text } , {
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        return res?.data
        
    }catch(err){

        return rejectWithValue(err.response?.data?.message)

    }

} )

const FilterUserSlice = createSlice({
    name : "filterUser",

    initialState : {
        filterItems : [], 
        loading : false,
        errors : null
    }, 

    extraReducers : (builder) => {
        builder.addCase(FILTER_USER.pending, (state) => {
            state.loading = true
            state.errors = null
        })  
        .addCase(FILTER_USER.fulfilled, (state, action) => {
            state.filterItems = action.payload
            state.loading = false

        })
        .addCase(FILTER_USER.rejected, (state, action) => {
            state.loading = false
            state.errors = action.payload
        } )
    }

})

export default FilterUserSlice.reducer;