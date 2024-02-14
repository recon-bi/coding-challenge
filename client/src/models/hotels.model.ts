import { hotelsActions } from 'redux/hotels.redux';
import AbstractModel from './abstractModel';
import handleError from 'src/errors';

const modelName = 'hotels'; // Give the model a name. You could make it easy on yourself and call it the same name as the endpoint name ;)

class HotelsModel extends AbstractModel {
  static instance: HotelsModel;

  modelName: string; // this model name should be logger-alarms

  private constructor() {
    super(modelName); // set the model name in the constructor of the abstract class if you want it to wire up the basic CRUD functions
    this.modelName = modelName; // override the model name in this class. due to the nature of the constructor, this should be done here as well as in the parent constructor
    this.reduxActions = hotelsActions; // this defined the default actions
  }

  static getInstance = (): HotelsModel => {
    if (!HotelsModel.instance) HotelsModel.instance = new HotelsModel();
    return this.instance;
  };

  public getSearchOptions = async () => {
    try {
      return await this.getWithQuerystring('search-options', {})
    } catch (error) {
      handleError(error, "getCities")
    } 
  }


  public getSearchResults = async (payload: any) => {
    try {
      return await this.getWithQuerystring('search', payload)
    } catch (error) {
      handleError(error, "getSearchResults")
    } 
  }
}

export default HotelsModel;
