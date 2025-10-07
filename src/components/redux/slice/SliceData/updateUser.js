import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../Api";

export const updateUserId = createAsyncThunk("/user/token", async ({id , formData, token }, { rejectWithValue }) => {
    try {
        const res = await API.patch(`/auth/profile/${id}`,formData,  {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(res?.data)
        return await res?.data?.message

    } catch (err) {
        return rejectWithValue(err.response?.data?.message)
    }
})

const updateUserSlice = createSlice({
    name: "updateUser",
    initialState: {
        updateId: null,
        loading: false,
        errors: null
    },
    extraReducers: (builder) => {
        builder.addCase(updateUserId.pending, (state) => {
            state.loading = true,
                state.errors = null
        })
            .addCase(updateUserId.fulfilled, (state, action) => {
                state.updateId = action.payload

                state.loading = false
            })
            .addCase(updateUserId.rejected, (state, action) => {
                state.loading = false
                state.errors = action.payload
            })
    }
})

export default updateUserSlice.reducer;
