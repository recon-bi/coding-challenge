import { DefaultReduxReducerType, DefaultReduxStateType } from './redux';

export interface QuoteReduxStateType extends DefaultReduxStateType {
  searchValue: string;
  selectedStatus: string[];
}

export interface QuoteReduxReducerType extends DefaultReduxReducerType {
  setSearchValue: (state: { searchValue: string }, { payload }: any) => void;
  setSelectedStatus: (state: { selectedStatus: string }, { payload }: any) => void;
}
