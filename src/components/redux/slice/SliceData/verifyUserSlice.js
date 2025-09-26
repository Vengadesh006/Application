import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../../Api";

export const loginFetch = createAsyncThunk(
    "login/thunk",
    async (info, { rejectWithValue }) => {
        try {
           
            const response = await API.post('/auth/login', info)

            console.log(response?.data?.message);
            

            return response?.data

        } catch (err) {
            console.log(err?.response?.data?.message);
            
           return rejectWithValue(err?.response?.data?.message)
        }

    }
)

const loginSlice = createSlice({
    name: "login",
    initialState: {
        userData: null,
        loading: false,
        errors: null
    },
    extraReducers: (builder) => {
        builder.addCase(loginFetch.pending, (state) => {
            state.loading = true,
                state.errors = null
        })
            .addCase(loginFetch.fulfilled, (state, action) => {
                state.userData = action.payload
                 
                state.loading = false
            })
            .addCase(loginFetch.rejected, (state, action) => {
                state.loading = false
                state.errors = action.payload
            })
    }
})

export default loginSlice.reducer;
