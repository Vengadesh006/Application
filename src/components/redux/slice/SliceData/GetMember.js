import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../Api";

export const getMemberFetch = createAsyncThunk("/user/token", async (token ,  { rejectWithValue }) => {
    try {
        const res = await API.get(`/member`,  {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return await res?.data

    } catch (err) {
        return rejectWithValue(err?.message)
    }
})

const getMemberSlice = createSlice({
    name: "memberId",
    initialState: {
        memberData: [],
        loading: false,
        errors: null
    },
    extraReducers: (builder) => {
        builder.addCase(getMemberFetch.pending, (state) => {
            state.loading = true,
                state.errors = null
        })
            .addCase(getMemberFetch.fulfilled, (state, action) => {
                state.memberData = action.payload

                state.loading = false
            })
            .addCase(getMemberFetch.rejected, (state, action) => {
                state.loading = false
                state.errors = action.payload
            })
    }
})

export default getMemberSlice.reducer;
