import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
  user:null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
    },
    setLogout: (state, action) => {
      state.user = null;
      state.isAuth = false;
      localStorage.removeItem('user');
    },
    setProfile:(state, action) => {
      state.user.email = action.payload.email;
      state.user.name = action.payload.name;
      let user = JSON.parse(localStorage.getItem('user'));
      user = {
        ...user,
        email:action.payload.email,
        name:action.payload.name,
      }
      localStorage.setItem('user', JSON.stringify(user));
    }
  },
})

// Action creators are generated for each case reducer function
export const {
  setLogin,
  setLogout,
  setProfile
} = authSlice.actions

export default authSlice.reducer