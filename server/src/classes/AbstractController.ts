import { Request, Response } from 'express';
// import { ObjectId } from 'mongodb';
import errorHandler from '../errorHandler';
import {
  // FindPolygonItemsParams,
  FindReqQuery,
  FilterSortParams,
  // QueryParametersReturnValue,
} from 'types/query';
import handleError from '../errorHandler';

class AbstractController {
  model;

  constructor(model) {
    this.model = model;
  }

  private getFilterDataType = (value) => {
    try {
      if (typeof value === 'object') return value.type || 'string';
      return JSON.parse(value).type || 'string';
    } catch (er) {
      return 'string';
    }
  };
  /**
   * @function parseFilter
   * @param id should be the id of the object - this should match the column or prop name being filtered on
   * @param value this can be an object
   * @returns object - (either a query object or a query object value [with no ID/ col name])
   * FILTER EXAMPLES:
   *
   *  - expression: (takes an object as the value.value)
   *      {
   *        id: "myPropName",
   *        value: { id: "myPropName", value: `{"$ne":null}`, type: "expression" },
   *      },
   *  - date: NOT USED - ERRORS
   *  - dateRange: (takes and array of [startDate, endDate] as the value.value)
   *      {
   *        id: "myPropName",
   *        value: { id: "myPropName", type: "dateRange", value: [startDate, endDate],
   *      }
   *  - default: (take single object as key (id) value (string) pair) [case-insensitive]
   *      {
   *        id: "myPropName",
   *        value: "myValue",
   *      }
   */
  private parseFilter = (id, value) => {
    try {
      const type = this.getFilterDataType(value);
      switch (type) {
        case 'expression': {
          const rVal = JSON.parse(value);
          return JSON.parse(rVal.value);
        }
        case 'dateRange': {
          const timeArray = value.value;
          return {
            $gte: new Date(timeArray[0]),
            $lte: new Date(timeArray[1]),
          };
        }
        case 'boolean':
        case 'number':
          return JSON.parse(value).value;
        case 'keyValuePair':
          return { [value.id]: value.value };

        default:
          return new RegExp(value, 'i');
      }
    } catch (er) {
      console.error('BadValue', er);
      return {};
    }
  };

  private getFilterQuery = (params: FilterSortParams) => {
    const { filters } = params;
    let filterQuery = {};
    const addFields = {};
    filters &&
      filters.forEach(({ id, value }) => {
        const thisValue = typeof value === 'object' ? JSON.parse(value[Object.keys(value)[0]]) : value;

        if (Array.isArray(thisValue)) {
          thisValue.forEach((val) => {
            const parsedFilter = this.parseFilter(val.id, val);
            filterQuery = { ...filterQuery, ...parsedFilter };
          });
        } else if (!isNaN(Number(thisValue))) {
          const newFieldName = `${id}_str`;
          addFields[newFieldName] = { $toString: `$${[id]}` };
          filterQuery[newFieldName] = new RegExp(thisValue);
        } else {
          filterQuery[id] = this.parseFilter(id, thisValue);
        }
      });
    if (Object.keys(filterQuery).length === 0) return {};
    return { filterQuery, addFields };
  };

  private getSortQuery = (params) => {
    try {
      const { sortBy } = params;
      if (!sortBy) return { _id: -1 };
      const sort = JSON.parse(sortBy);
      if (sort?.length === 0) return { _id: -1 };
      const direction = sort[0].desc ? -1 : 1;
      const id = sort[0].id;
      return { [id]: direction, _id: -1 };
    } catch (err) {
      handleError(err);
      return {};
    }
  };

  /****************** END OF PRIVATE FUNCTIONS ************************************ */

  public getAll = async (req: Request, res: Response) => {
    try {
      const results = await this.model.find({}).limit(1000);
      return res.status(200).json(results);
    } catch (err) {
      return errorHandler(err, res);
    }
  };

  public find = async (req: Request, res: Response) => {
    try {
      const { sortBy, sortDesc, pageSize, page, query } = req.query as unknown as FindReqQuery;
      const find = query ? JSON.parse(query as string) : {};
      const sort = sortBy ? { [sortBy]: sortDesc ? -1 : 1 } : { $natural: -1 };
      const skip = parseInt(page) * parseInt(pageSize);
      const limit = parseInt(pageSize);
      const results = await this.model
        .find(find)
        .sort(sort)
        .skip(skip || 0)
        .limit(limit || 100);
      return res.status(200).json(results);
    } catch (err) {
      return errorHandler(err, res);
    }
  };

  public findOne = async (req: Request, res: Response) => {
    const _id = req.params.id;
    try {
      const results = await this.model.findOne({ _id });
      return res.status(200).json(results);
    } catch (err) {
      return errorHandler(err, res);
    }
  };

  public createOne = async (req: Request, res: Response) => {
    const newDoc = req.body;
    try {
      const response = await this.model.create(newDoc);
      return res.status(200).json(response);
    } catch (err) {
      return errorHandler(err, res);
    }
  };

  public createMany = async (req: Request, res: Response) => {
    const docs = req.body;
    try {
      const bulkOps = docs.map((doc) => {
        return {
          insertOne: {
            doc,
          },
        };
      });
      const response = await this.model.bulkWrite(bulkOps);
      return res.status(200).json(response);
    } catch (err) {
      return errorHandler(err, res);
    }
  };

  public updateOne = async (req: Request, res: Response) => {
    const { _id } = req.body;
    const update = req.body;
    delete update._id;
    try {
      const response = await this.model.updateOne({ _id }, { $set: update });
      return res.status(200).json(response);
    } catch (err) {
      return errorHandler(err, res);
    }
  };

  public getPagedItems = async (req: Request<object, object, object, FilterSortParams>, res: Response) => {
    try {
      const { pageIndex, pageSize } = req.query;
      const sortBy = this.getSortQuery(req.query);
      const { filterQuery, addFields } = this.getFilterQuery(req.query);

      const pipeline = [];
      if (addFields) pipeline.push({ $addFields: addFields });
      if (filterQuery) pipeline.push({ $match: { $and: [filterQuery] } });
      pipeline.push({ $sort: sortBy }, { $skip: Number(pageIndex * pageSize) }, { $limit: Number(pageSize) });

      const response = await this.model.aggregate(pipeline);
      return res.status(200).json(response);
    } catch (err) {
      return errorHandler(err, res);
    }
  };

  public getPagedItemCount = async (req: Request<object, object, object, FilterSortParams>, res: Response) => {
    try {
      const { filterQuery, addFields } = this.getFilterQuery(req.query);
      const pipeline = [];
      if (addFields) pipeline.push({ $addFields: addFields });
      if (filterQuery) pipeline.push({ $match: { $and: [filterQuery] } });
      pipeline.push({ $group: { _id: null, count: { $sum: 1 } } });

      const response = await this.model.aggregate(pipeline);
      const count = response && response.length > 0 ? response[0].count : 0;
      return res.status(200).json(count);
    } catch (err) {
      return errorHandler(err, res);
    }
  };
}

export default AbstractController;
