import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../../Api";


export const updatePassword = createAsyncThunk('/user/password',
    async (payload, { rejectWithValue }) => {
        try {
            const { data } =await API.post("/auth/reset-password", payload)

            return data

        } catch (err) {
            return rejectWithValue(err.response?.data?.message )
        }

    }
)

const ChangePassword = createSlice({
    name: "updatePassword",
    initialState: {
        update: null,
        loading: false,
        errors: null
    },
    extraReducers: (builder) => {
        builder.addCase(updatePassword.pending, (state) => {
            state.loading = true
            state.errors = null
        })
            .addCase(updatePassword.fulfilled, (state, action) => {
                state.update = action.payload
                state.loading = false
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.loading = false

                state.errors = null
            })
    }
})

export default ChangePassword.reducer;