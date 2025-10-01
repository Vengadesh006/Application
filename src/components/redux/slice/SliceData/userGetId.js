import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../Api";

export const userGetId = createAsyncThunk(
    "user/getById",
    async (token, { rejectWithValue }) => {
        try {
            const res = await API.get(`/auth/profile/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(res?.data);
            return res.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || err.message || "Something went wrong"
            );
        }
    }
);

const userGetIdSlice = createSlice({
    name: "userGetStore",
    initialState: {
        userId: null,
        loading: false,
        errors: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userGetId.pending, (state) => {
                state.loading = true;
                state.errors = null;
            })
            .addCase(userGetId.fulfilled, (state, action) => {
                state.userId = action.payload;
                state.loading = false;
            })
            .addCase(userGetId.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload;
            });
    },
});

export default userGetIdSlice.reducer;
