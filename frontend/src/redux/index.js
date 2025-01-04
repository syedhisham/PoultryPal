import { configureStore } from '@reduxjs/toolkit';
import userSliceReducer from './userSlice';
import emailReducer from "./emailSlice";
import productSliceReducer from './productSlice';
import tokenReducer from './tokenSlice'
import roleReducer from './roleSlice'



export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    email: emailReducer,
    product: productSliceReducer,
    token: tokenReducer,
    role: roleReducer
  },
});
