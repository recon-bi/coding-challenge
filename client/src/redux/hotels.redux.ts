import { createSlice } from '@reduxjs/toolkit';
import initialState from 'redux/constants/_defaultReduxState';
import reducers from 'redux/constants/_defaultReduxReducers';

export const hotelsSlice = createSlice({
  name: 'hotels',
  initialState,
  reducers,
});

export const { actions: hotelsActions, reducer: hotelsReducer } = hotelsSlice;

export default hotelsSlice;
