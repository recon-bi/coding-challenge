import AbstractController from '../../classes/AbstractController';
import model from './example.model';
import { IExample } from '/types/example';

class ExampleController extends AbstractController<IExample> {
  constructor() {
    super(model);
  }
}

export default ExampleController;
