import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import API from "../../../Api"

export const EmailVerify = createAsyncThunk('/user/email', async (email, { rejectWithValue }) => {
    try {
        const { data } = await API.post("/auth/verifyEmail",  email )
        return data

    } catch (err) {
        return rejectWithValue(err.response?.data?.message )
    }
})

const verifyEmail = createSlice({
    name: "email",
    initialState: {
        emailInfo: [],
        loading: false,
        errors: null
    },

    extraReducers: (builder) => {
        builder.addCase(EmailVerify.pending, (state) => {
            state.loading = true;
            state.errors = null
        })
            .addCase(EmailVerify.fulfilled, (state, action) => {
                state.emailInfo = action.payload
                state.loading = false
            })
            .addCase(EmailVerify.rejected, (state, action) => {
                state.loading = false
                state.errors = action.payload
            })
    }

})

export default verifyEmail.reducer;