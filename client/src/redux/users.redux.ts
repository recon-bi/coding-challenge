/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import initialState from 'redux/constants/_defaultReduxState';
import reducers from 'redux/constants/_defaultReduxReducers';

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers,
});

export const { actions: userActions, reducer: userReducer } = userSlice;

export default userSlice;
