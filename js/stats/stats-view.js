import AbstractView from '../abstract-view';
import header from '../common/header-view';
import ResultView from './result-view';
import Application from '../application';

class StatsView extends AbstractView {
  constructor(data, history) {
    super();
    this._data = data;
    this._history = history;
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
    this._element.querySelector('.header__back').addEventListener('click', this._onClick);
  }

  clearHandlers() {
    this._element.querySelector('.header__back').removeEventListener('click', this._onClick);
  }

  _onClick() {
    Application.showWelcome();
    this.destroy();
  }

  destroy() {
    super.destroy();
    this._data = null;
    this._history = null;
  }
}

export default (data, history) => new StatsView(data, history).element;
