import AbstractView from '../abstract-view';
import StatsResultView from '../common/stats-result-view';

export default class TaskDoubleView extends AbstractView {
  constructor(data, dataStats) {
    super();
    this._data = data;
    this._dataStats = dataStats;
    this._onAnswer = null;
  }

  set onAnswer(handler) {
    this._onAnswer = handler;
  }

  getMarkup() {
    let statsResult = new StatsResultView(this._dataStats);
    let content = `
      <form class="game__content  game__content--wide">
        <div class="game__option">
          <img src="${this._data.question.image}" alt="${this._data.question.alt}" width="705" height="455">
          <label class="game__answer  game__answer--photo">
            <input name="question1" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--wide  game__answer--paint">
            <input name="question1" type="radio" value="paint">
            <span>Рисунок</span>
          </label>
        </div>
      </form>`;

    return `
      <div class="game">
        <p class="game__task">${this._data.task}</p>
        ${content}
        <div class="stats">
          ${statsResult.getMarkup()}
        </div>
      </div>`;
  }

  bindHandlers() {
    this.onClick = this.onClick.bind(this);
    this._element.querySelector('.game').addEventListener('click', this.onClick);
  }

  clearHandlers() {
    this._element.querySelector('.game').removeEventListener('click', this.onClick);
  }

  onClick(e) {
    if (!e.target.parentElement.classList.contains('game__answer') || !e.target.value) {
      return;
    }

    this._onAnswer(e.target.value);
  }
}

