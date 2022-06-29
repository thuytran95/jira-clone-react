import { User } from './../../interface/user';
import { createSlice } from '@reduxjs/toolkit';
import currentUser from 'assets/data/auth.json';

interface InitialStateType {
  user: User;
}

const initialState: InitialStateType = {
  user: currentUser
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {}
});

export default authSlice.reducer;
