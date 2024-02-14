/* eslint-disable no-use-before-define */
import { pdfSlice } from 'redux/pdfs.redux';
import AbstractModel from './abstractModel';

const modelName = 'pdfs'; // Give the model a name. You could make it easy on yourself and call it the same name as the endpoint name ;)

class PDFModel extends AbstractModel {
  static instance: PDFModel;

  modelName: string; // this model name should be logger-alarms

  private constructor() {
    super(modelName); // set the model name in the constructor of the abstract class if you want it to wire up the basic CRUD functions
    this.modelName = modelName; // override the model name in this class. due to the nature of the constructor, this should be done here as well as in the parent constructor
    this.reduxActions = pdfSlice.actions; // this defined the default actions
  }

  static getInstance = (): PDFModel => {
    if (!PDFModel.instance) PDFModel.instance = new PDFModel();
    return this.instance;
  };
}

export default PDFModel;
