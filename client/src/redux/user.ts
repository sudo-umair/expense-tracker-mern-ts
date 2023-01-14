import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  token: '',
  name: '',
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      const { email, token, name } = action.payload;
      state.email = email;
      state.token = token;
      state.name = name;
      state.isLoggedIn = true;
    },

    logout: (state) => {
      return initialState;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
