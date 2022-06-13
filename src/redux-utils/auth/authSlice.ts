import { User } from './../../interface/user';
import { createSlice } from '@reduxjs/toolkit';
import currentUser from 'assets/data/auth.json';

const initialState: User = currentUser;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {}
});

export default authSlice.reducer;
