// import { DefaultReduxReducerType } from 'types/redux';

const DEFAULT_REDUX_REDUCERS = {
  updateState: (state: any, { payload }: any) => {
    const newState = { ...state, ...payload };
    return newState;
  },
  updateDocumentCount: (state: { documentCount: number }, { payload }: any) => {
    state.documentCount = payload.documentCount;
  },
  updateFilterState: (state: any, { payload }: any) => {
    state.state.filters = payload;
  },
  updateCache: (state: { cache: any[] }, { payload }: any) => {
    state.cache = payload;
  },
  selectItem: (state: { selectedItem: any; selectedItems: any[] }, action: { payload: any }) => {
    const { selectedItem, selectedItems } = action.payload;
    state.selectedItem = selectedItem;
    if (selectedItems && state.selectedItems && !state.selectedItems?.find((x) => x._id === selectedItem._id))
      state.selectedItems = state.selectedItems.concat(selectedItem);
  },
  viewItem: (state: { viewItem: any }, action: { payload: any }) => {
    const { viewItem } = action.payload;
    state.viewItem = viewItem;
  },
  deselect: (state: { selectedItems: any[]; selectedItem: any }, action: { payload: any }) => {
    const { _id } = action.payload.selectedItem;
    const index = state.selectedItems.findIndex((x) => x._id === _id);
    state.selectedItems.splice(index, 1);
    state.selectedItem = {};
  },
};
export default DEFAULT_REDUX_REDUCERS;
