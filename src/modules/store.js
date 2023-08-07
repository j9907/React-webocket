import { configureStore } from '@reduxjs/toolkit';
import authReducer from './axiosutil';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;