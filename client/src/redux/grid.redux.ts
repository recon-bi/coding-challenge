/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

interface gridComponent {
  type: string;
  properties: [];
  ref: string;
}

interface gridState {
  components: gridComponent[];
}

const initialGridState = {
  components: [],
} as unknown as gridState;

export const gridSlice = createSlice({
  name: 'grid',
  initialState: initialGridState,
  reducers: {
    addComponent(state, action) {
      state.components = [...state.components, action.payload];
    },
    removeComponent(state, action) {
      state.components = state.components.filter((e) => e.ref !== action.payload.ref);
    },
    resetGrid(state) {
      state.components = [];
    },
  },
});

export const { actions: gridActions, reducer: gridReducer } = gridSlice;

export default gridSlice;
