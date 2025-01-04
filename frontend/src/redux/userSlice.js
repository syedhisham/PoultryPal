import { createSlice } from '@reduxjs/toolkit';

const loadUserFromLocalStorage = () => {
  try {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null; // Parse only if valid JSON is present
  } catch (error) {
    console.error('Failed to parse user from localStorage:', error);
    return null; // Return null in case of an error
  }
};

const initialState = {
  user: loadUserFromLocalStorage(), // Load user from localStorage if available
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginRedux: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload)); // Save user to localStorage
    },
    logoutRedux: (state) => {
      state.user = null;
      localStorage.removeItem('user'); // Remove user from localStorage on logout
    }
  }
});

export const { loginRedux, logoutRedux } = userSlice.actions;
export default userSlice.reducer;
