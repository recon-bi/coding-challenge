import { propertiesActions } from 'redux/properties.redux';
import AbstractModel from './abstractModel';

const modelName = 'properties'; // Give the model a name. You could make it easy on yourself and call it the same name as the endpoint name ;)

class PropertiesModel extends AbstractModel {
  static instance: PropertiesModel;

  modelName: string; // this model name should be logger-alarms

  private constructor() {
    super(modelName); // set the model name in the constructor of the abstract class if you want it to wire up the basic CRUD functions
    this.modelName = modelName; // override the model name in this class. due to the nature of the constructor, this should be done here as well as in the parent constructor
    this.reduxActions = propertiesActions; // this defined the default actions
  }

  static getInstance = (): PropertiesModel => {
    if (!PropertiesModel.instance) PropertiesModel.instance = new PropertiesModel();
    return this.instance;
  };
}

export default PropertiesModel;
