import AbstractView from '../abstract-view';

export default class StatsResultView extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  getMarkup() {
    return `
      <ul class="stats">
        ${this._data.map((value) => `<li class="stats__result stats__result--${value}"></li>`).join(' ')}
      </ul>`;
  }
}
