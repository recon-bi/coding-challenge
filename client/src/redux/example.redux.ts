/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import initialState from 'redux/constants/_defaultReduxState';
import reducers from 'redux/constants/_defaultReduxReducers';

export const exampleSlice = createSlice({
  name: 'examples',
  initialState,
  reducers,
});

export const { actions: exampleActions, reducer: exampleReducer } = exampleSlice;

export default exampleSlice;
