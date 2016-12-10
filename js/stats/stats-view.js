import AbstractView from '../abstract-view';
import header from '../common/header-view';
import ResultView from './result-view';

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
}

export default (data) => new StatsView(data).element;
