import { quoteActions } from 'redux/quotes.redux';
import AbstractModel from './abstractModel';
import handleError from '../errors';
import { useFetch } from 'lib/secureFetch';

const modelName = 'quotes'; // Give the model a name. You could make it easy on yourself and call it the same name as the endpoint name ;)

class QuoteModel extends AbstractModel {
  static instance: QuoteModel;

  modelName: string; // this model name should be logger-alarms

  private constructor() {
    super(modelName); // set the model name in the constructor of the abstract class if you want it to wire up the basic CRUD functions
    this.modelName = modelName; // override the model name in this class. due to the nature of the constructor, this should be done here as well as in the parent constructor
    this.reduxActions = quoteActions; // this defined the default actions
  }

  static getInstance = (): QuoteModel => {
    if (!QuoteModel.instance) QuoteModel.instance = new QuoteModel();
    return this.instance;
  };

  public search = async (payload: any) => {
    try {
      const params = this.encodeQueryString(payload);
      return await useFetch(`${this.defaultApiRoute}/search?${params.toString()}`);
    } catch (error) {
      handleError;
    }
  };

  public getUserDocCount = async (creatorId: string) => {
    try {
      return await useFetch(`${this.defaultApiRoute}/userDocsCount?id=${creatorId}`);
    } catch (error) {
      console.error(error);
    }
  };
}

export default QuoteModel;
