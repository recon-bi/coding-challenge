/**  ! ! P L E A S E  R E A D ! ! ! ! ! ! ! ! ! ! !
 * @Configuration - You must configure the model that extends this class by setting the following properties in the constructor
 *  The abstract model will wire up public function to the API model for you if you name the model that extends this class the
 *  same as the endpoint name.
 *
 *  For example:
 *    - url: https://myApiName/endpoint-name
 *    - modelName: endpoint-name
 *
 *  Using the defaults, the following will be created:
 *    - a socket called 'endpoint-name'
 *    - a Redux state called endpointName
 *
 *  You must also set this.modelName in the abstract class by passing modelName into the constructor in order for the endpoints to be mapped properly
 *
 * @modelName example
 *  const modelName = "endpoint-name"
 *
 *  class ExampleClass extends AbstractClass {
 *      constructor() {
 *          super(modelName);
 *          this.modelName = modelName;
 *      }
 *  }
 *
 *
 * @Sockets - If you want the abstract model to wire up sockets for you, you must override the following parameters in your class
 * -  @param useSockets - Determines whether or not sockets will be used (default: true | yes)
 * -  @param socketCollectionName - Set this to the name of the collection that comes in from the MongoDb change stream
 *
 * @Redux - In order to use the native redux handlers, you need to override the following properties in your class
 * -  @param useRedux - Determines whether or not Redux will be used (default: true | yes)
 * -  @param reduxStateName - The name of the Redux state in the reduxStore
 * -  @param reduxActions - This is the actions you have exported from your reduxSlices
 * -    * The following actions are required to be defined
 * -    * Use the defaultReduxState constant as a guideline for writing these methods
 *      @updateState (state, payload) - [PLEASE REFER TO constants/defaultReduxState.ts for definition]
 */
import SingleSocket from 'lib/Socket';
import reduxStore from 'redux/store';
import { findAndReplaceObject } from 'lib/utils/arrays';
import { toCamelCase } from 'lib/utils/strings';
import API_URL, { getHeaders } from 'config/api';
import defaultReduxState from 'redux/constants/_defaultReduxState';
import { DataTableState } from 'types/dataTable';
import { useFetch } from 'lib/secureFetch';
import { DefaultReduxStateType } from 'types/redux';
import { CachedItemType } from 'types/system';

class AbstractModel {
  modelName: string; // This must be set in the child class! Otherwise the value 'default' will be used

  useSockets: boolean; // Set this to false if you don't want to use sockets (default: true)

  private singleSocket: SingleSocket; // This is the socket instance that the model will keep open for communication. (DO NOT SET)

  socketCollectionName: string; // This is the name of the mongodb collection in the Change Stream. You need to set this in your class!

  useRedux: boolean; // Set this to false if you DO NOT want to use Redux (default: true)

  useReduxCache: boolean; // If using Redux, you can cache recently selected items for up to 5 minutes

  useNotifications: boolean; // If set to true, will update notifications when a new record is inserted

  reduxStateName: string; // Set this to the name of the Redux state you will use to access this

  reduxActions: any; // This should be a reference to your redux actions. (see comments for more info)

  defaultApiRoute: string; // The default API route for the apps database;

  overrideSocketResponse: ((response: any) => any) | null | undefined;

  dispatch: any;

  headers: any;

  urlItems: {
    // If you wish to redirect any of the default CRUD calls you can do so by merging a urlItems in the child class constructor
    getAll: string;
    getOne: string;
    create: string;
    update: string;
    getPagedItems: string;
    getPagedItemCount: string;
    getMapObjects: string;
    search: string;
  };

  cacheItems: number; // has a default of 5
  cacheTimeout: number; // (in minutes) has default of 5 minutes
  cache: CachedItemType[]; // only used if useRedux is false and cachedItems > 0

  constructor(modelName?: string) {
    this.modelName = modelName || 'default';

    // Basic Endpoint Config
    this.defaultApiRoute = `${API_URL}${API_URL.endsWith('/') ? '' : '/'}${this.modelName}`;
    this.urlItems = {
      getAll: this.defaultApiRoute,
      getOne: this.defaultApiRoute,
      create: this.defaultApiRoute,
      update: this.defaultApiRoute,
      getPagedItems: `${this.defaultApiRoute}/paged-items`,
      getPagedItemCount: `${this.defaultApiRoute}/paged-items-count`,
      getMapObjects: `${this.defaultApiRoute}/map-objects`,
      search: `search`,
    };

    // Socket configuration
    this.useSockets = true;
    this.singleSocket = SingleSocket.getInstance();
    this.socketCollectionName = this.modelName.replace(/-/, '');

    // Redux configuration
    this.useRedux = true;
    this.useReduxCache = false;
    this.useNotifications = false;
    this.reduxStateName = toCamelCase(this.modelName);
    this.reduxActions = undefined;
    this.cacheItems = 5;
    this.cacheTimeout = 5; // minutes
    this.cache = []; // only used if useRedux is false and cachedItems > 0

    if (this.useSockets) this.registerSockets();
    this.overrideSocketResponse = undefined;
    this.dispatch = reduxStore.dispatch;
    this.headers = getHeaders();
  }

  // This registers a socket based on configuration settings provided
  private registerSockets = (channel: any = this.modelName) => {
    console.log('socket registered:', this.modelName);
    this.singleSocket.registerSocketChannel(channel, this.handleSocketResponse);
  };

  // This is the main socket handler and guard function for socket handlers
  private handleSocketResponse = (response: any) => {
    console.log('socket response:', response);
    if (this.overrideSocketResponse !== undefined && this.overrideSocketResponse !== null)
      return this.overrideSocketResponse(response);
    try {
      const { operationType } = response;
      const error = `AbstractModel::handleSocketResponse failed: Operation type '${operationType}' not handled`;
      switch (operationType) {
        case 'insert':
          return this.handleSocketInsert(response);
        case 'update':
          return this.handleSocketUpdate(response);
        default:
          console.error(error);
          return new Error(error);
      }
    } catch (err) {
      return new Error(JSON.stringify(err));
    }
  };

  // This handles inserts from sockets via Redux
  private handleSocketInsert = ({ fullDocument }: any) => {
    if (this.useRedux) {
      const { data: currentData, pageSize, notifications: currentNotifications } = this.getCurrentReduxState();
      const data = [fullDocument].concat(currentData);
      if (data.length > pageSize) data.pop();
      const notifications = this.useNotifications ? [fullDocument].concat(currentNotifications) : currentNotifications;

      reduxStore.dispatch(this.reduxActions.updateState({ data, notifications }));

      return { data, notifications };
    }
    return fullDocument;
  };

  // This handles update from sockets via Redux
  private handleSocketUpdate = ({ documentKey, updateDescription: { updatedFields } }: any) => {
    if (this.useRedux) {
      const previousState = this.getCurrentReduxState();
      const previousDataItem = previousState.data.find((x: any) => x._id === documentKey._id);
      const previousSelectedItem = previousState.selectedItems.find((x: any) => x._id === documentKey._id);
      const previousNotificationItem = previousState.notifications.find((x: any) => x._id === documentKey._id);

      const notifications = previousNotificationItem
        ? findAndReplaceObject(previousState.notifications, {
            ...previousNotificationItem,
            ...updatedFields,
          })
        : previousState.notifications;

      const selectedItem =
        documentKey._id === previousState.selectedItem._id
          ? { ...previousState.selectedItem, ...updatedFields }
          : previousState.selectedItem;

      const viewItem =
        documentKey._id === previousState.viewItem._id
          ? { ...previousState.viewItem, ...updatedFields }
          : previousState.viewItem;

      const data = previousDataItem
        ? findAndReplaceObject(previousState.data, { ...previousDataItem, ...updatedFields })
        : previousState.data;

      const selectedItems = previousSelectedItem
        ? findAndReplaceObject(previousState.selectedItems, {
            ...previousSelectedItem,
            ...updatedFields,
          })
        : previousState.selectedItems;

      const update = {
        ...previousState,
        ...{ selectedItem, selectedItems, viewItem, data, notifications },
      };

      reduxStore.dispatch(this.reduxActions.updateState(update));

      return update;
    }
    // eslint-disable-next-line no-else-return
    else return { documentKey, updatedFields };
  };

  // This is a private helper function that returns the current redux state
  private getCurrentReduxState = () => {
    const reduxState: any = reduxStore.getState();
    return reduxState[this.reduxStateName];
  };

  private getCache = () => {
    if (this.useRedux) {
      const currentReduxState: DefaultReduxStateType = this.getCurrentReduxState();
      return structuredClone(currentReduxState.cache);
    }
    return structuredClone(this.cache);
  };

  private findCacheItem = (urlItem: string) => {
    const cache = this.getCache();
    return cache.find((x: CachedItemType) => x.urlItem === urlItem);
  };

  private addCacheItem = (urlItem: string, data: any | any[]) => {
    const cache = this.getCache();
    const timestamp = new Date().valueOf();
    const cachedItem = this.findCacheItem(urlItem);

    if (cachedItem) return cache;
    if (this.cacheItems === 0) return [];
    if (this.cacheItems === cache.length) cache.shift();

    cache.push({ urlItem, data, timestamp });
    return cache;
  };

  private updateReduxState = (state: any) => {
    if (this.reduxActions && this.useRedux) {
      reduxStore.dispatch(this.reduxActions.updateState(state));
    }
  };

  private updateReduxDocumentCount = (documentCount: any) => {
    if (this.reduxActions && this.useRedux) {
      reduxStore.dispatch(this.reduxActions.updateDocumentCount(documentCount));
    }
  };

  private getAvailableCachedData = async (
    urlItem: string,
    stateName?: string,
    payload?: DataTableState,
    refresh?: boolean,
  ) => {
    let results = [];
    if (this.cacheItems > 0 && !refresh) {
      const cachedItem = this.findCacheItem(urlItem);
      if (cachedItem) results = cachedItem.data;
    }

    if (results.length === 0) {
      const response = await useFetch(urlItem);
      results = await response;
    }

    if (stateName === 'documentCount') this.updateReduxDocumentCount({ documentCount: results });
    else {
      const cache = this.addCacheItem(urlItem, results);
      const updateStateName = stateName ? { [stateName]: results } : {};
      const updateState = payload ? payload : {};
      const updateCache = cache && this.cacheItems > 0 ? cache : [];
      this.updateReduxState({
        ...updateStateName,
        ...updateState,
        ...updateCache,
      });
    }
    return results;
  };

  private getParameters = ({ pageSize, pageIndex, filters, sortBy }: DataTableState) => {
    const queryString = new URLSearchParams();

    queryString.append('pageIndex', pageIndex ? pageIndex.toString() : '0');
    queryString.append('pageSize', pageSize ? pageSize.toString() : '10');

    if (sortBy) queryString.append('sortBy', JSON.stringify(sortBy));

    filters?.forEach(({ id, value }, index) => {
      const name = `filters[${index}][id]=${id}`;
      const valueTo =
        typeof value === 'object'
          ? `filters[${index}][value]=${JSON.stringify(value)}`
          : `filters[${index}][value]=${value}`;
      queryString.append(name, id);
      queryString.append(valueTo, typeof value === 'object' ? JSON.stringify(value) : value);
    });

    return queryString;
  };

  public encodeQueryString = (filters: any) => {
    const queryString = new URLSearchParams();

    Object.keys(filters).forEach((key) => {
      const value = typeof filters[key] === 'object' ? JSON.stringify(filters[key]) : filters[key];
      queryString.append(key, value);
    });

    return queryString;
  };

  /** ****************************************************************************
   *
   *      @description - THIS SECTION DEFINES THE BASIC CRUD FUNCTIONS
   *
   ***************************************************************************** */

  // Returns the first 1000 objects
  getAll = async (refresh?: boolean) => {
    try {
      return this.getAvailableCachedData(this.urlItems.getAll, 'data', defaultReduxState.state || {}, refresh);
    } catch (er) {
      console.error(er);
      return null;
    }
  };

  // Gets and object using findOne()
  // Returns one JSON object based on provided ID
  getOne = async (id: object) => {
    try {
      const response = await useFetch(`${this.urlItems.getOne}/${id}`);
      return await response;
    } catch (er) {
      console.error(er);
      return null;
    }
  };

  // Performs a POST method to create the payload as a new document
  // Returns new object with ID
  create = async (payload: any) => {
    try {
      const response = await useFetch(`${this.urlItems.create}`, {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      return await response;
    } catch (er) {
      console.error(er);
      return null;
    }
  };

  // Performs a PUT method to update and object using the payload using the _id field
  // Returns updated object
  update = async (payload: any) => {
    try {
      const response = await useFetch(`${this.urlItems.update}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      });
      return await response;
    } catch (er) {
      console.error(er);
      return null;
    }
  };

  // Run a simple fetch function (with auth headers)
  // Parametrizes payload objects as query string
  getWithQuerystring = async (endpoint: string, payload: any) => {
    try {
      const queryString = this.encodeQueryString(payload);
      const reqUrl = `${this.defaultApiRoute}/${endpoint}?${queryString.toString()}`;
      const response = await useFetch(reqUrl);
      return await response;
    } catch (er) {
      console.error(er);
      return null;
    }
  };

  // Supports sorting, paging and filtering for the DataTable component
  // Parametrizes payload objects as query string
  getPagedItems = async (payload: DataTableState, refresh?: boolean, initialFilters = []) => {
    const payloadFilters = payload.filters || [];
    const filters = payloadFilters.concat(initialFilters);
    const updatedPayload = { ...payload, ...{ filters } };
    const queryString = this.getParameters(updatedPayload);
    try {
      return await this.getAvailableCachedData(
        `${this.urlItems.getPagedItems}?${queryString.toString()}`,
        'data',
        payload,
        refresh,
      );
    } catch (er) {
      console.error(er);
      return null;
    }
  };

  // Gets the total document count for DataTable's paging
  // Parametrizes payload objects as query string
  getPagedItemsCount = async (payload: DataTableState, refresh?: boolean, initialFilters = []) => {
    const payloadFilters = payload.filters || [];
    const filters = payloadFilters.concat(initialFilters);
    const updatedPayload = { ...payload, ...{ filters } };
    const queryString = this.getParameters(updatedPayload);
    try {
      return await this.getAvailableCachedData(
        `${this.urlItems.getPagedItemCount}?${queryString.toString()}`,
        'documentCount',
        payload,
        refresh,
      );
    } catch (er) {
      console.error(er);
      return null;
    }
  };

  // Fetches objects that have a geoLocation field as Geometry and returns GeoJSON objects with other fields as props
  // Parametrizes payload objects as query string
  getMapObjects = async (payload?: DataTableState, refresh?: boolean) => {
    const queryString = payload
      ? Object.keys(payload)
          .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent((payload as never)[key])}`)
          .join('&')
      : null;

    try {
      return await this.getAvailableCachedData(
        `${this.urlItems.getMapObjects}?${queryString}`,
        'mapObjects',
        defaultReduxState.state || {},
        refresh,
      );
    } catch (er) {
      console.error(er);
      return null;
    }
  };

  // Searches for in any of the fields/ properties passed in the payload
  // Returns an array of search results
  public search = async (payload: any) => {
    try {
      return await this.getWithQuerystring(this.urlItems.search, payload);
    } catch (error) {
      console.log(error);
    }
  };
}

export default AbstractModel;
