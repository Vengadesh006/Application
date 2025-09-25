import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../../Api";

export const signupFetch = createAsyncThunk(
  "signup/thunk",
  async (info, { rejectWithValue }) => {
    try {
      const res = await API.post("/auth/signup", info);  
      console.log(res.data);
      return res?.data;  
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const userSlice = createSlice({
  name: "signin",
  initialState: {
    userData: null,
    loading: false,
    errors: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupFetch.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(signupFetch.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.loading = false;
      })
      .addCase(signupFetch.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });
  }
});

export default userSlice.reducer;