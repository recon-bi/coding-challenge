import React from 'react';
import DataTableContainer from 'common/DataTable/DataTableContainer';
import { useSelector } from 'react-redux';
import { DataTableFilter } from 'types/dataTable';
// import defaultReduxState from "redux/constants/_defaultReduxState";
import { isEqual } from 'underscore';
import usePrevious from 'hooks/usePrevious';
// import { DefaultReduxStateType } from "types/redux";

interface Props {
  columns: object[];
  rows?: object[];
  rowCount?: number;
  modelInstance?: any;
  useRedux?: boolean;
  onRowClick?: (row?: any) => void;
  initialState?: any;
  initialFilters?: any;
  pagerVisibility: 'full' | 'minimal' | 'none';
  manualFilters?: boolean;
  manualPagination?: boolean;
  selectedRow?: string | number | null;
}

function DataTable({
  columns,
  rows,
  rowCount,
  modelInstance,
  useRedux,
  onRowClick,
  initialState,
  initialFilters,
  pagerVisibility,
  manualFilters,
  manualPagination,
  selectedRow,
}: Props) {
  const [currentState, setCurrentState] = React.useState<any>();
  const prevState = usePrevious(currentState);

  const reduxStateData = useSelector((state: any) => state[modelInstance?.reduxStateName]?.data, isEqual);

  const reduxStateDocumentCount = useSelector(
    (state: any) => state[modelInstance?.reduxStateName]?.documentCount,
    isEqual,
  );

  const reduxState = useSelector((state: any) => state[modelInstance?.reduxStateName]?.state, isEqual);

  const setCurrentPage = (pageIndex: number) => {
    const state = { ...currentState?.state, ...{ pageIndex } };
    const newState: any = { ...currentState, ...{ state } };
    setCurrentState(newState);
  };

  const handlePageNext = () => {
    setCurrentState((prevState: any) => {
      return {
        ...prevState,
        state: {
          ...prevState.state,
          pageIndex: prevState.state.pageIndex + 1,
        },
      };
    });
  };

  const handlePagePrevious = () => {
    setCurrentState((prevState: any) => {
      return {
        ...prevState,
        state: {
          ...prevState.state,
          pageIndex: prevState.state.pageIndex - 1,
        },
      };
    });
  };

  const handlePageSelect = (pageNo: number) => setCurrentPage(pageNo);

  const handlePageSizeChange = (pageSize: number) => {
    const state = { ...currentState?.state, ...{ pageSize } };
    const newState: any = { ...currentState, ...{ state } };
    setCurrentState(newState);
  };

  const handleFilterChange = (filters: DataTableFilter) => {
    const state = { ...currentState?.state, ...{ filters, pageIndex: 0 } };
    const newState: any = { ...currentState, ...{ state } };
    setCurrentState(newState);
  };

  const handleColumnSortChange = (sortBy: any) => {
    const state = { ...currentState?.state, ...{ sortBy: [sortBy], pageIndex: 0 } };
    const newState: any = { ...currentState, ...{ state } };
    setCurrentState(newState);
  };

  const removeColumnSort = () => {
    const state = { ...currentState?.state, ...{ sortBy: [], pageIndex: 0 } };
    const newState: any = { ...currentState, ...{ state } };
    setCurrentState(newState);
  };

  const removeColumnFilter = (id: string) => {
    if (currentState?.state && currentState.state.filters) {
      const filters = currentState.state.filters.filter((x: any) => x.id !== id);
      const state = { ...currentState.state, ...{ filters, pageIndex: 0 } };
      const newState: any = { ...currentState, ...{ state } };
      setCurrentState(newState);
    }
  };

  React.useEffect(() => {
    if (useRedux && modelInstance?.useRedux) {
      try {
        const state = reduxState;
        const documentCount = reduxStateDocumentCount;
        const data = reduxStateData;
        const newState = {
          state,
          data,
          documentCount,
          initialFilters,
        };
        setCurrentState(newState);
      } catch (reduxStateError: any) {
        console.error(reduxStateError);
      }
    } else {
      const newState = {
        data: rows,
        documentCount: rowCount,
        state: initialState,
        initialFilters,
      };
      setCurrentState(newState);
    }
  }, [rows]);

  React.useEffect(() => {
    const getData = async (state?: any, refresh?: boolean) => {
      const { pageIndex, pageSize, filters, sortBy } = state;
      const payload = {
        pageIndex,
        pageSize,
        filters,
        sortBy,
      };
      modelInstance.getPagedItems(payload, refresh, initialFilters);
    };

    if (currentState && modelInstance) {
      getData(currentState.state);
    }
  }, [currentState?.state, currentState?.initialFilters]);

  React.useEffect(() => {
    const getRowCount = async (state: any) => {
      const { filters } = state;
      const payload = {
        filters,
      };
      modelInstance.getPagedItemsCount(payload, false, initialFilters);
    };

    if (currentState?.state?.filters && modelInstance) {
      getRowCount(currentState.state);
    }
  }, [currentState?.state?.filters, currentState?.initialFilters]);

  React.useEffect(() => {
    if (currentState && !isEqual(reduxStateData, currentState?.data))
      setCurrentState({ ...currentState, ...{ data: reduxStateData } });
  }, [reduxStateData]);

  React.useEffect(() => {
    if (currentState && !isEqual(reduxStateDocumentCount, currentState?.documentCount))
      setCurrentState({ ...currentState, ...{ documentCount: reduxStateDocumentCount } });
  }, [reduxStateDocumentCount]);

  React.useEffect(() => {
    // console.log({ initialFilters }, currentState && !isEqual(initialFilters, currentState?.initialFilters));
    if (currentState && !isEqual(initialFilters, currentState?.initialFilters))
      setCurrentState({ ...currentState, ...{ initialFilters } });
  }, [initialFilters]);

  if (!currentState) return null;

  return (
    <DataTableContainer
      table={{
        columns,
        rows: currentState.data || [],
      }}
      initialState={currentState.state}
      documentCount={currentState.documentCount}
      onPageNext={handlePageNext}
      onPagePrevious={handlePagePrevious}
      onPageSelect={handlePageSelect}
      onPageSizeChange={handlePageSizeChange}
      onFilterChange={handleFilterChange}
      onRowClick={onRowClick}
      onColumnSortChange={handleColumnSortChange}
      onRemoveColumnSort={removeColumnSort}
      onRemoveColumnFilter={removeColumnFilter}
      pagerVisibility={pagerVisibility}
      manualFilters={manualFilters}
      manualPagination={manualPagination}
      selectedRow={selectedRow}
    />
  );
}

DataTable.defaultProps = {
  rows: [],
  rowCount: 0,
  modelInstance: null,
  useRedux: true,
  onRowClick: () => {},
  initialState: {
    pageIndex: 0,
    pageSize: 10,
    filters: [],
    sortBy: [],
  },
  initialFilters: [],
  pagerVisibility: 'full',
  manualFilters: true,
  manualPagination: true,
};

export default DataTable;
