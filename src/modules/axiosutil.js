// authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import{useNavigate } from 'react-router-dom';
import axios from 'axios';


export const loginUser = createAsyncThunk('auth/loginUser', async (credentials) => {
  try {
    console.log(credentials)
    const response = await axios.post('/api/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});


const initialState = {
  user: null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        console.log(state.user)
        
        
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
