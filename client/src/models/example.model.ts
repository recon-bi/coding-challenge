/* eslint-disable no-use-before-define */
import { exampleSlice } from 'redux/example.redux';
import AbstractModel from './abstractModel';

const modelName = 'example'; // Give the model a name. You could make it easy on yourself and call it the same name as the endpoint name ;)

class ExampleModel extends AbstractModel {
  static instance: ExampleModel;

  modelName: string; // this model name should be logger-alarms

  private constructor() {
    super(modelName); // set the model name in the constructor of the abstract class if you want it to wire up the basic CRUD functions
    this.modelName = modelName; // override the model name in this class. due to the nature of the constructor, this should be done here as well as in the parent constructor
    this.reduxActions = exampleSlice.actions; // this defined the default actions
  }

  static getInstance = (): ExampleModel => {
    if (!ExampleModel.instance) ExampleModel.instance = new ExampleModel();
    return this.instance;
  };
}

export default ExampleModel;
