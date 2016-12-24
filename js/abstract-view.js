import {createElementFromTemplate} from './utils';

export default class AbstractView {
  constructor() {
    this._element = null;
  }

  get element() {
    if (!this._element) {
      this._element = createElementFromTemplate(this.getMarkup());
      this.bindHandlers();
    }

    return this._element;
  }

  getMarkup() {
    throw new Error('Method getMarkup is not defined');
  }

  bindHandlers() {

  }

  clearHandlers() {

  }

  destroy() {
    this.clearHandlers();
    this._element = null;
  }
}
