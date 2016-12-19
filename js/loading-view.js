import AbstractView from './abstract-view';

class LoadingView extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  getMarkup() {
    return `
      <div class="loading">
        <h4>${this._data.title}</h4>
        <p>${this._data.description}</p>
      </div>`;
  }
}

export default (data) => new LoadingView(data).element;
