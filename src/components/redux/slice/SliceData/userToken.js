import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../Api";


export const userFetchToken = createAsyncThunk('/user/token', async (token, { rejectWithValue }) => {
    try {
        const res = await API.get('/profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(res?.data);
        
        return await res?.data

    } catch (err) {
        return rejectWithValue(err?.message)
    }
})

const userTokenSlice = createSlice({
    name: "userToken",
    initialState: {
        userToken: null,
        loading: false,
        errors: null
    },
    extraReducers: (builder) => {
        builder.addCase(userFetchToken.pending, (state) => {
            state.loading = true,
            state.errors = null
        })
            .addCase(userFetchToken.fulfilled, (state, action) => {
                state.userToken = action.payload
                console.log(state.userToken);
                
                state.loading = false
            })
            .addCase(userFetchToken.rejected, (state, action) => {
                state.loading = false
                state.errors = action.payload
            })
    }
})

export default userTokenSlice.reducer;
