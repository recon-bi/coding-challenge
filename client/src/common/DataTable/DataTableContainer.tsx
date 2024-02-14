import React, { useState } from 'react';

import { useAsyncDebounce, useFilters, usePagination, useSortBy, useTable } from 'react-table';

// @mui material components
import Autocomplete from '@mui/material/Autocomplete';
import Icon from '@mui/material/Icon';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

// Material Dashboard 2 PRO React TS components
import MDBox from 'ui/MDBox';
import MDInput from 'ui/MDInput';
import MDPagination from 'ui/MDPagination';
import MDTypography from 'ui/MDTypography';

// import { DataTableState } from "types/dataTable";
// import FilterIcon from "@mui/icons-material/FilterAlt";
// import MDButton from "ui/MDButton";

// Material Dashboard 2 PRO React TS examples components
import { DataTableFilter } from 'types/dataTable';
import DefaultColumnFilter from '../DataFilters/DefaultColumnFilter';
import DataTableBodyCell from './DataTableBodyCell';
import DataTableFilterSort from './DataTableFilterSort';
import DataTableHeadCell from './DataTableHeadCell';
import { isEqual } from 'underscore';

// Declaring props types for DataTable
interface Props {
  entriesPerPage?:
    | false
    | {
        defaultValue: number;
        entries: number[];
      };
  canSearch?: boolean;
  showTotalEntries?: boolean;
  table: {
    columns: { [key: string]: any }[];
    rows: { [key: string]: any }[];
  };
  pagination?: {
    variant: 'contained' | 'gradient';
    color: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | 'dark' | 'light';
  };
  isSorted?: boolean;
  noEndBorder?: boolean;
  documentCount?: number;
  initialState: any;
  onPageNext: () => void;
  onPagePrevious: () => void;
  onPageSelect: (pageNo: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onFilterChange: (filters: DataTableFilter) => void;
  onRowClick?: (row?: any) => void;
  onColumnSortChange: (sortBy: any) => void;
  onRemoveColumnSort: () => void;
  onRemoveColumnFilter: (id: string) => void;
  pagerVisibility: 'full' | 'minimal' | 'none';
  manualPagination: boolean | undefined;
  manualFilters: boolean | undefined;
  selectedRow?: string | number | null;
}

function DataTableContainer({
  entriesPerPage,
  canSearch,
  showTotalEntries,
  table,
  pagination,
  isSorted,
  noEndBorder,
  documentCount,
  initialState,
  onPageNext,
  onPagePrevious,
  onPageSelect,
  onPageSizeChange,
  onFilterChange,
  onRowClick,
  onColumnSortChange,
  onRemoveColumnSort,
  onRemoveColumnFilter,
  pagerVisibility,
  manualPagination,
  manualFilters,
  selectedRow,
}: Props): JSX.Element {
  const columns = React.useMemo<any>(() => table.columns, [table]);
  const data = React.useMemo<any>(() => table.rows, [table]);
  const [filterState, setFilterState] = React.useState<any>(null);
  const { pageSize, pageIndex } = initialState;
  const pageCount = Math.ceil(documentCount! / pageSize);
  const [activeRowIndex, setActiveRowIndex] = useState<number | null>(null);

  const defaultColumn: any = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    [],
  );

  const tableInstance = useTable(
    {
      columns,
      data,
      defaultColumn,
      manualPagination,
      manualFilters,
      initialState,
    },
    useFilters,
    useSortBy,
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    setGlobalFilter,
    state: { globalFilter, filters },
  }: any = tableInstance;

  // TEMP MOCKS
  const pageOptions: any[] = [];
  const canPreviousPage = pageIndex > 0;
  const canNextPage = pageIndex < pageCount - 1;
  const firstPageToDraw = pageIndex < 3 ? 0 : pageIndex - 2;

  const pagesToDraw = pageCount > 5 && pageIndex < pageCount ? 5 : pageCount;

  const pageNumbers = Array.from(Array(pagesToDraw).keys()).map((x) => x + firstPageToDraw);

  const renderPagination = pageNumbers.map((option: any) => {
    if (option >= pageCount) return null;
    return (
      <MDPagination
        item
        key={option}
        onClick={() => onPageSelect(Number(option))}
        active={pageIndex === Number(option)}
      >
        {option + 1}
      </MDPagination>
    );
  });

  // Handler for the input to set the pagination index
  const handleInputPagination = ({ target: { value } }: any) =>
    value > pageOptions.length || value < 0 ? onPageSelect(0) : onPageSelect(Number(value));

  // Customized page options starting from 1
  const customizedPageOptions = pageOptions.map((option: any) => option + 1);

  // Setting value for the pagination input
  const handleInputPaginationValue = ({ target: value }: any) => onPageSelect(Number(value.value - 1));

  // Search input value state
  const [search, setSearch] = React.useState(globalFilter);

  // Search input state handle
  const onSearchChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 100);

  // A function that sets the sorted value for the table
  const setSortedValue = (column: any) => {
    let sortedValue;

    if (isSorted && column.isSorted) {
      sortedValue = column.isSortedDesc ? 'desc' : 'asc';
    } else if (isSorted) {
      sortedValue = 'none';
    } else {
      sortedValue = false;
    }

    return sortedValue;
  };

  // Setting the entries starting point
  const entriesStart = pageIndex === 0 ? pageIndex + 1 : pageIndex * pageSize + 1;

  // Setting the entries ending point
  let entriesEnd;

  if (pageIndex === 0) {
    entriesEnd = pageSize;
  } else if (pageIndex === pageOptions.length - 1) {
    entriesEnd = rows.length;
  } else {
    entriesEnd = pageSize * (pageIndex + 1);
  }

  const handleFilterSortToggle = (e: any, name: string) => {
    const newState = {
      anchorEl: e.currentTarget,
      name,
    };
    setFilterState(newState);
  };

  React.useEffect(() => {
    const compare = isEqual(initialState.filters, filters);

    if (initialState.filters && compare) {
      onFilterChange(initialState.filters);
    } else {
      onFilterChange(filters);
    }
  }, [filters]);

  // const shouldHighlightRow = (row: any) => {
  //   // Check if selectedRow is present and equals the value in the first column
  //   return selectedRow && row.cells[0].value === selectedRow;
  // };

  // Handler to set the active row index when a row is clicked
  const handleRowClick = (row: any, rowIndex: number) => {
    // Toggle the active state if the same row is clicked again
    setActiveRowIndex((prevIndex) => (prevIndex === rowIndex ? null : rowIndex));

    // Call the onRowClick callback if provided
    if (onRowClick) {
      onRowClick(row);
    }
  };

  return (
    <TableContainer sx={{ boxShadow: 'none' }}>
      {entriesPerPage && canSearch ? (
        <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
          <MDBox width="12rem" ml="auto">
            <MDInput
              placeholder="Search..."
              value={search}
              size="small"
              fullWidth
              onChange={({ currentTarget }: any) => {
                setSearch(search);
                onSearchChange(currentTarget.value);
              }}
            />
          </MDBox>
        </MDBox>
      ) : null}

      <Table {...getTableProps()}>
        <MDBox component="thead">
          {headerGroups.map((headerGroup: any, index: number) => (
            <TableRow {...headerGroup.getHeaderGroupProps()} key={`dataTableGroupHeader_${index}`}>
              {headerGroup.headers.map((column: any, cellIndex: number) => (
                <DataTableHeadCell
                  key={`dataTableHeaderCell_${cellIndex}`}
                  {...column.getHeaderProps(isSorted && column.getSortByToggleProps())}
                  width={column.width ? column.width : 'auto'}
                  align={column.align ? column.align : 'left'}
                  sorted={setSortedValue(column)}
                  onClick={(e: any) => handleFilterSortToggle(e, column.id)}
                  column={column}
                  onRemoveSort={onRemoveColumnSort}
                  onRemoveFilter={onRemoveColumnFilter}
                >
                  {column.render('Header')}
                  {column.canSort && (
                    <DataTableFilterSort
                      filterState={filterState}
                      column={column}
                      onColumnSortChange={onColumnSortChange}
                    />
                  )}
                </DataTableHeadCell>
              ))}
            </TableRow>
          ))}
        </MDBox>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row: any, key: any) => {
            // {rows.map((row: any, rowIndex: number) => {
            prepareRow(row);
            // Determine if the row is active
            // const isActive = rowIndex === activeRowIndex;
            // // Check if the row should be highlighted
            const shouldHighlight = row.index === activeRowIndex;
            return (
              <TableRow
                key={`dataTableRowIndex_${key}`}
                {...row.getRowProps()}
                onClick={() => handleRowClick(row, key)}
                // onClick={() => handleRowClick(rowIndex)} // Call the click handler
                hover
                selected={selectedRow}
                sx={{
                  cursor: 'pointer',
                  // Apply different color if the row should be highlighted
                  backgroundColor: shouldHighlight ? 'lightgray' : 'inherit',
                  // backgroundColor: isActive ? "lightgray" : "inherit",
                }}
              >
                {row.cells.map((cell: any, cellIndex: number) => (
                  <DataTableBodyCell
                    key={`dataTableBodyCellIndex_${cellIndex}`}
                    noBorder={noEndBorder && rows.length - 1 === key}
                    // noBorder={noEndBorder && rows.length - 1 === rowIndex}
                    align={cell.column.align ? cell.column.align : 'left'}
                    {...cell.getCellProps()}
                  >
                    {cell.render('Cell')}
                  </DataTableBodyCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <MDBox
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        p={!showTotalEntries && pageCount === 1 ? 0 : 3}
      >
        {showTotalEntries && documentCount && documentCount > 0 && pagerVisibility !== 'none' ? (
          <MDBox mb={{ xs: 3, sm: 0 }}>
            <MDTypography variant="button" color="secondary" fontWeight="regular">
              Showing {documentCount && documentCount > 10 && `${entriesStart} to ${entriesEnd} of `}{' '}
              {documentCount || rows.length} entries
            </MDTypography>
          </MDBox>
        ) : null}
        {documentCount && documentCount > 10 && pagerVisibility === 'full' ? (
          <MDBox display="flex" alignItems="center">
            <Autocomplete
              disableClearable
              value={pageSize.toString()}
              options={['10', '20', '50']}
              onChange={(event, newValue) => {
                event.target;
                onPageSizeChange(Number(newValue));
              }}
              size="small"
              sx={{ width: '5rem' }}
              renderInput={(params) => <MDInput {...params} />}
            />
            <MDTypography variant="caption" color="secondary">
              &nbsp;&nbsp;entries per page
            </MDTypography>
          </MDBox>
        ) : null}
        {pageCount > 1 && pagerVisibility !== 'none' && (
          <MDPagination
            variant={pagination?.variant ? pagination.variant : 'gradient'}
            color={pagination?.color ? pagination.color : 'info'}
          >
            {pageCount > 6 && pagerVisibility === 'full' && (
              <MDBox width="10rem" mx={1}>
                <MDInput
                  inputProps={{ type: 'number', min: 1, max: customizedPageOptions.length }}
                  value={customizedPageOptions[pageIndex]}
                  onChange={(event: any) => {
                    handleInputPagination(event);
                    handleInputPaginationValue(event);
                  }}
                />
              </MDBox>
            )}
            {/* This is where the page buttons begin */}
            {canPreviousPage && (
              <MDPagination item onClick={() => onPagePrevious()}>
                <Icon sx={{ fontWeight: 'bold' }}>chevron_left</Icon>
              </MDPagination>
            )}
            {renderPagination}
            {canNextPage && (
              <MDPagination item onClick={() => onPageNext()}>
                <Icon sx={{ fontWeight: 'bold' }}>chevron_right</Icon>
              </MDPagination>
            )}
          </MDPagination>
        )}
      </MDBox>
    </TableContainer>
  );
}

// Declaring default props for DataTable
DataTableContainer.defaultProps = {
  entriesPerPage: { defaultValue: 10, entries: ['5', '10', '15', '20', '25'] },
  canSearch: false,
  showTotalEntries: true,
  pagination: { variant: 'gradient', color: 'info' },
  isSorted: true,
  noEndBorder: false,
  documentCount: 0,
};

export default DataTableContainer;
