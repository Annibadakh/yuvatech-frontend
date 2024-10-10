
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createSelector } from '@reduxjs/toolkit';
export const selectUser = (state) => state.auth.user;

const TOKEN_STORAGE_KEY = "authToken"; // Key for storing the token in local storage
const apiUrl = process.env.REACT_APP_API_BASE_URL

// Function to retrieve token from local storage
const getStoredToken = () => localStorage.getItem(TOKEN_STORAGE_KEY);

// Function to store token in local storage
const storeToken = (token) => localStorage.setItem(TOKEN_STORAGE_KEY, token);

// Function to remove token from local storage
const removeToken = () => localStorage.removeItem(TOKEN_STORAGE_KEY);

export const selectAuthToken = (state) => state.auth.user?.token;

const initialState = {
    user: null,
    student: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}
export const selectUserId = createSelector(
    [selectUser],
    (user) => user?.id
  );
export const LoginUser = createAsyncThunk("auth/LoginUser", async (credentials, thunkAPI) => {
    try {
        const response = await axios.post(`${apiUrl}/login`, credentials);
        const { token } = response.data;
        storeToken(token); // Store the token in local storage
        return response.data;
    } catch (error) {
        if (error.response) {
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }
});

export const LoginStudent = createAsyncThunk("auth/LoginStudent", async (credentials, thunkAPI) => {
    try {
        const response = await axios.post(`${apiUrl}/studentlogin`, credentials);
        return response.data;
    } catch (error) {
        if (error.response) {
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }
});

export const LogOut = createAsyncThunk("auth/LogOut", async () => {
    removeToken(); // Remove the token from local storage upon logout
    await axios.delete(`${apiUrl}/logout`);
});

export const getMe = createAsyncThunk("auth/getMe", async (_, thunkAPI) => {
    try {
        const response = await axios.get(`${apiUrl}/me`);
        return response.data;
    } catch (error) {
        if (error.response) {
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(LoginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(LoginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(LoginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(LoginStudent.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(LoginStudent.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.student = action.payload;
            })
            .addCase(LoginStudent.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(LogOut.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(LogOut.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = null;
                state.student = null;
            })
            .addCase(LogOut.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getMe.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMe.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(getMe.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
