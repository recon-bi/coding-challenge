import { DefaultReduxStateType } from 'types/redux';

const DEFAULT_REDUX_STATE: DefaultReduxStateType = {
  selectedItem: {},
  selectedItems: [],
  viewItem: {},
  data: [],
  state: {
    pageIndex: 0,
    pageSize: 10,
    filters: [],
    sortBy: [],
  },
  documentCount: 0,
  isLoading: false,
  cache: [],
};

export default DEFAULT_REDUX_STATE;
