import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: localStorage.getItem("email") || "", // Load email from localStorage if available
};

const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
      localStorage.setItem("email", action.payload); // Save email to localStorage
    },
    clearEmail: (state) => {
      state.email = "";
      localStorage.removeItem("email"); // Remove email from localStorage
    },
  },
});

export const { setEmail, clearEmail } = emailSlice.actions;

export const selectEmail = (state) => state.email.email;

export default emailSlice.reducer;
