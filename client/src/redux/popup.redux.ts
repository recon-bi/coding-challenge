import { createSlice } from '@reduxjs/toolkit';
import React from 'react';

interface PopupStateType {
  content: string[];
  lngLat: number[];
  Component: React.FC | null;
  state: any;
}
const initialPopupState: PopupStateType = { content: [], lngLat: [], Component: null, state: null };

export const popupSlice = createSlice({
  name: 'popup',
  initialState: initialPopupState,
  reducers: {
    setPopup(state, action) {
      state.content = action.payload.content;
      state.lngLat = action.payload.lngLat;
      state.Component = action.payload.Component;
      state.state = action.payload.state;
    },
  },
});

export const { actions: popupActions, reducer: popupReducer } = popupSlice;

export default popupSlice;
