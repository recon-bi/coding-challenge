export type DataTableFilter = {
  id: string;
  value: string;
  type?: string;
};

export type DataTableSortField = {
  id: string;
  desc: boolean;
};

export type DataTableState = {
  filters: DataTableFilter[];
  sortBy: DataTableSortField[];
  pageIndex: number;
  pageSize: number;
};
