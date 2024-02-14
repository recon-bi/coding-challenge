import { userActions } from 'redux/users.redux';
import AbstractModel from './abstractModel';
import handleError from '../errors';
import { useFetch } from 'lib/secureFetch';

const modelName = 'users'; // Give the model a name. You could make it easy on yourself and call it the same name as the endpoint name ;)

class UserModel extends AbstractModel {
  static instance: UserModel;

  modelName: string; // this model name should be logger-alarms

  private constructor() {
    super(modelName); // set the model name in the constructor of the abstract class if you want it to wire up the basic CRUD functions
    this.modelName = modelName; // override the model name in this class. due to the nature of the constructor, this should be done here as well as in the parent constructor
    this.reduxActions = userActions; // this defined the default actions
  }

  static getInstance = (): UserModel => {
    if (!UserModel.instance) UserModel.instance = new UserModel();
    return this.instance;
  };

  public getRoles = async () => {
    try {
      const response = await useFetch(`${this.defaultApiRoute}/roles`);
      return await response;
    } catch (error) {
      handleError(error);
    }
  };
}

export default UserModel;
