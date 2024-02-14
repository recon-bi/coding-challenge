import { customerActions } from 'redux/customers.redux';
import AbstractModel from './abstractModel';

const modelName = 'customers'; // Give the model a name. You could make it easy on yourself and call it the same name as the endpoint name ;)

class CustomerModel extends AbstractModel {
  static instance: CustomerModel;

  modelName: string; // this model name should be logger-alarms

  private constructor() {
    super(modelName); // set the model name in the constructor of the abstract class if you want it to wire up the basic CRUD functions
    this.modelName = modelName; // override the model name in this class. due to the nature of the constructor, this should be done here as well as in the parent constructor
    this.reduxActions = customerActions; // this defined the default actions
  }

  static getInstance = (): CustomerModel => {
    if (!CustomerModel.instance) CustomerModel.instance = new CustomerModel();
    return this.instance;
  };
}

export default CustomerModel;
