import AbstractView from '../abstract-view';
import header from '../common/header-view';
import ResultView from './result-view';
import Application from '../application';

class StatsView extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  getMarkup() {
    let resultsList = this._data.results.map((value) => new ResultView(value).getMarkup()).join(' ');

    return `
      ${header.getMarkup()}
      <div class="result">
        <h1>${this._data.title}</h1>
        ${resultsList}
      </div>`;
  }

  bindHandlers() {
    this._element.querySelector('.header__back').addEventListener('click', this.onClick);
  }

  clearHandlers() {
    this._element.querySelector('.header__back').removeEventListener('click', this.onClick);
  }

  onClick() {
    Application.showGame();
  }
}

export default (data) => new StatsView(data).element;
