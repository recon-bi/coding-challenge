/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import initialState from 'redux/constants/_defaultReduxState';
import reducers from 'redux/constants/_defaultReduxReducers';

export const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers,
});

export const { actions: bookingActions, reducer: bookingsReducer } = bookingsSlice;

export default bookingsSlice;
