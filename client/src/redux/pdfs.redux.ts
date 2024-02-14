/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import initialState from 'redux/constants/_defaultReduxState';
import reducers from 'redux/constants/_defaultReduxReducers';

export const pdfSlice = createSlice({
  name: 'pdfs',
  initialState,
  reducers,
});

export const { actions: pdfActions, reducer: pdfReducer } = pdfSlice;

export default pdfSlice;
