import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  role: localStorage.getItem("role") || "", // Load role from localStorage if available
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
      localStorage.setItem("role", action.payload); // Save role to localStorage
    },
    clearRole: (state) => {
      state.role = "";
      localStorage.removeItem("role"); // Remove role from localStorage
    },
  },
});

export const { setRole, clearRole } = roleSlice.actions;

export const selectRole = (state) => state.role.role;

export default roleSlice.reducer;
