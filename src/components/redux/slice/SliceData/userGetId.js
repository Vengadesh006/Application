import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../Api";


export const userGetId = createAsyncThunk('/user/token', async ({ id, token }, { rejectWithValue }) => {
    try {
        const res = await API.get(`/auth/profile/${id}`, {
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

const userGetIdSlice = createSlice({
    name: "userId",
    initialState: {
        userId: null,
        loading: false,
        errors: null
    },
    extraReducers: (builder) => {
        builder.addCase(userGetId.pending, (state) => {
            state.loading = true,
            state.errors = null
        })
            .addCase(userGetId.fulfilled, (state, action) => {
                state.userId = action.payload

                state.loading = false
            })
            .addCase(userGetId.rejected, (state, action) => {
                state.loading = false
                state.errors = action.payload
            })
    }
})

export default userGetIdSlice.reducer;
