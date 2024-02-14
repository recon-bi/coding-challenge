/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import initialState from 'redux/constants/_defaultReduxState';
import reducers from 'redux/constants/_defaultReduxReducers';

export const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers,
});

export const { actions: customerActions, reducer: customerReducer } = customerSlice;

export default customerSlice;
