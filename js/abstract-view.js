import {createElementFromTemplate} from './utils';

export default class AbstractView {
  constructor() {
    this._element = null;
  }

  getMarkup() {
    throw new Error('Method getMarkup is not defined');
  }

  bindHandlers() {

  }

  clearHandlers() {

  }

  get element() {
    if (!this._element) {
      this._element = createElementFromTemplate(this.getMarkup());
      this.bindHandlers();
    }

    return this._element;
  }
}
