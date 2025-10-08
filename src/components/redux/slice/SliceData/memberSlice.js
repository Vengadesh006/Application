import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../Api";

export const memberFetch = createAsyncThunk("/user/token", async ({ payload , token}, { rejectWithValue }) => {
    try {
        const res = await API.post(`/member`, payload ,  {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
      
        return  res?.data

    } catch (err) {
        return rejectWithValue(err?.message)
    }
})

const memberSlice = createSlice({
    name: "member",
    initialState: {
        member: [],
        loading: false,
        errors: null
    },
    extraReducers: (builder) => {
        builder.addCase(memberFetch.pending, (state) => {
            state.loading = true,
                state.errors = null
        })
            .addCase(memberFetch.fulfilled, (state, action) => {
                state.member = action.payload

                state.loading = false
            })
            .addCase(memberFetch.rejected, (state, action) => {
                state.loading = false
                state.errors = action.payload
            })
    }
})

export default memberSlice.reducer;
