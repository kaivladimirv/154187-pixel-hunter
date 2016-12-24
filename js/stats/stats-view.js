import AbstractView from '../abstract-view';
import header from '../common/header-view';
import ResultView from './result-view';
import Application from '../application';

class StatsView extends AbstractView {
  constructor(data, history) {
    super();
    this._data = data;
    this._history = history;
    this._headerBack = null;
  }

  getMarkup() {
    let resultsList = this._history.map((value, index) => new ResultView(value, index + 1).getMarkup()).join(' ');

    return `
      ${header.getMarkup()}
      <div class="result">
        <h1>${this._data.title}</h1>
        ${resultsList}
      </div>`;
  }

  bindHandlers() {
    this._onClick = this._onClick.bind(this);
    this._headerBack = this._element.querySelector('.header__back');
    this._headerBack.addEventListener('click', this._onClick);
  }

  clearHandlers() {
    this._headerBack.removeEventListener('click', this._onClick);
    this._headerBack = null;
  }

  _onClick() {
    Application.showWelcome();
    this.destroy();
  }

  destroy() {
    this._data = null;
    this._history = null;
    super.destroy();
  }
}

export default (data, history) => new StatsView(data, history).element;
