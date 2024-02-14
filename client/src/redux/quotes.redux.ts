import { createSlice } from '@reduxjs/toolkit';
import defaultState from 'redux/constants/_defaultReduxState';
import defaultReducers from 'redux/constants/_defaultReduxReducers';
import { QuoteReduxStateType } from 'types/quotes';

const initialState: QuoteReduxStateType = {
  ...defaultState,
  ...{
    selectedStatus: [],
    searchValue: '',
  },
};

const quoteReducers = {
  setSearchValue: (state: { searchValue: string }, { payload }: any) => {
    state.searchValue = payload.value;
  },
  setSelectedStatus: (state: { selectedStatus: string }, { payload }: any) => {
    state.selectedStatus = payload.value;
  },
};

const reducers: any = { ...defaultReducers, ...quoteReducers };

export const quoteSlice = createSlice({
  name: 'quotes',
  initialState,
  reducers,
});

export const { actions: quoteActions, reducer: quoteReducer } = quoteSlice;

export default quoteSlice;
