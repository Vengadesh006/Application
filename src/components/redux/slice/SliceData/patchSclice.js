import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../Api";

export const patchUser = createAsyncThunk(
    '/user/thunk',
    async ({ id, token, info }, { rejectWithValue }) => {
        try {

            const headers = {
                Authorization: `Bearer ${token}`
            };

            const res = await API.patch(`/auth/signup/${id}`, info , { headers });

            console.log(res.data);

            return res?.data;

        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

const patchData = createSlice({
    name: "userUpdate",
    initialState: {
        patchServer: null,
        loading: false,
        errors: null
    },
    extraReducers: (builder) => {
        builder.addCase(patchUser.pending, (state) => {
            state.loading = true
            state.errors = null;
        })
            .addCase(patchUser.fulfilled, (state, action) => {
                state.userUpdate = action.payload
                console.log(action.payload);
                
                state.errors = null
            })
            .addCase(patchUser.rejected, (state, action) => {
                state.loading = false
                state.errors = action.payload
            })
    }
})

export default patchData.reducer;