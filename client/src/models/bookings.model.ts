import { bookingActions } from 'redux/bookings.redux';
import AbstractModel from './abstractModel';

const modelName = 'bookings'; // Give the model a name. You could make it easy on yourself and call it the same name as the endpoint name ;)

class BookingsModel extends AbstractModel {
  static instance: BookingsModel;

  modelName: string; // this model name should be logger-alarms

  private constructor() {
    super(modelName); // set the model name in the constructor of the abstract class if you want it to wire up the basic CRUD functions
    this.modelName = modelName; // override the model name in this class. due to the nature of the constructor, this should be done here as well as in the parent constructor
    this.reduxActions = bookingActions; // this defined the default actions
  }

  static getInstance = (): BookingsModel => {
    if (!BookingsModel.instance) BookingsModel.instance = new BookingsModel();
    return this.instance;
  };
}

export default BookingsModel;
