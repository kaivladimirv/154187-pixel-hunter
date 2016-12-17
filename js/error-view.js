import AbstractView from './abstract-view';

class ErrorView extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  getMarkup() {
    return `
      <div class="loading error">
        <h4>${this._data.title}</h4>
        <p>${this._data.description}</p>
      </div>`;
  }
}

export default (data) => new ErrorView(data).element;

