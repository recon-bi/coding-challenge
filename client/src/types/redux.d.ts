
import { DataTableState } from './dataTable';

export interface ReduxState {
  popup: any;
  grid: any;
  users: any;
};

export type DefaultReduxStateType = {
  selectedItem: object;
  selectedItems: object[];
  viewItem: object;
  data: any[];
  state: DataTableState;
  documentCount: number;
  isLoading: boolean;
  cache: any[];
};

export interface DefaultReduxReducerType {
  updateState: (state: any, { payload }: any) => void;
  updateDocumentCount: (state: { documentCount: number }, { payload }: any) => void;
  updateFilterState: (state: any, { payload }: any) => void;
  updateCache: (state: { cache: any[] }, { payload }: any) => void;
  selectItem: (state: { selectedItem: any; selectedItems: any[] }, action: { payload: any }) => void;
  viewItem: (state: { viewItem: any }, action: { payload: any }) => void;
  deselect: (state: { selectedItems: any[]; selectedItem: any }, action: { payload: any }) => void;
}



