import AbstractView from '../abstract-view';
import StatsResultView from '../common/stats-result-view';
import {answerTypes} from '../data/game-data';
import {loadImages} from '../utils';

export default class TaskDoubleView extends AbstractView {
  constructor(data, dataStats) {
    super();
    this._data = data;
    this._dataStats = dataStats;
    this._onAnswer = null;
    this._clickablElement = null;
  }

  set onAnswer(handler) {
    this._onAnswer = handler;
  }

  getMarkup() {
    let statsResult = new StatsResultView(this._dataStats);
    let content = `
      <form class="game__content  game__content--wide">
        <div class="game__option">
          <img src="" alt="Option 1" width="705" height="455">
          <label class="game__answer  game__answer--photo">
            <input name="question1" type="radio" value="${answerTypes.PHOTO}">
            <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--wide  game__answer--paint">
            <input name="question1" type="radio" value="${answerTypes.PAINTING}">
            <span>Рисунок</span>
          </label>
        </div>
      </form>`;

    return `
      <div class="game">
        <p class="game__task">${this._data.question}</p>
        ${content}
        <div class="stats">
          ${statsResult.getMarkup()}
        </div>
      </div>`;
  }

  bindHandlers() {
    loadImages(this._element.querySelectorAll('.game__content img'), this._data.answers);

    this._onClick = this._onClick.bind(this);
    this._clickablElement = this._element.querySelector('.game');
    this._clickablElement.addEventListener('click', this._onClick);
  }

  clearHandlers() {
    this._clickablElement.removeEventListener('click', this._onClick);
    this._clickablElement = null;
  }

  _onClick(e) {
    if (!e.target.parentElement.classList.contains('game__answer') || !e.target.value) {
      return;
    }

    this._onAnswer(e.target.value);
    this.destroy();
  }

  destroy() {
    this._data = null;
    this._dataStats = null;
    this._onAnswer = null;
    super.destroy();
  }
}
