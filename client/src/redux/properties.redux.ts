/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import initialState from 'redux/constants/_defaultReduxState';
import reducers from 'redux/constants/_defaultReduxReducers';

export const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers,
});

export const { actions: propertiesActions, reducer: propertiesReducer } = propertiesSlice;

export default propertiesSlice;
