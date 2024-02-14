import mongoose from "mongoose";

type FindItemsFromPointParams = {
  lat: string;
  long: string;
  distance?: number;
  maxResults?: number;
};

type FindPolygonItemsParams = {
  ne: string;
  sw: string;
  date?: string;
  maxResults?: number;
  geometryType?: string;
};

type FindReqQuery = {
  sortBy?: string;
  sortDesc?: string;
  pageSize: string;
  page: string;
  query?: string;
};

type QueryParameters = {
  id: string;
  value?: any;
  type?: string;
  desc?: boolean;
};

type FilterSortParams = {
  filters: QueryParameters[];
  sortBy: QueryParameters[];
  pageIndex: number;
  pageSize: number;
  lastId: mongoose.ObjectId;
};

type QueryParametersReturnValue = {
  findQuery: object;
  sortBy?: object;
};

type TrendApiRequestParameters = {
  start: number;
  end: number;
  dmaCode?: string;
  deviceId?: string;
  channels: string[];
};

type FilterQuery = {};

type SortQuery = {};

export {
  FindItemsFromPointParams,
  FindPolygonItemsParams,
  FindReqQuery,
  QueryParameters,
  FilterSortParams,
  QueryParametersReturnValue,
  TrendApiRequestParameters,
};
