import AbstractView from '../abstract-view';
import StatsResultView from '../common/stats-result-view';
import {loadImages} from '../utils';

export default class TaskTripleView extends AbstractView {
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
      <form class="game__content  game__content--triple">
        ${this._data.answers.map((value, index) => `
          <div class="game__option">
            <img src="" alt="Option ${index + 1}" width="304" height="455">
          </div>`).join(' ')}
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

    this.onClick = this.onClick.bind(this);
    this._element.querySelector('.game').addEventListener('click', this.onClick);
  }

  clearHandlers() {
    this._element.querySelector('.game').removeEventListener('click', this.onClick);
  }

  onClick(e) {
    if (!e.target.classList.contains('game__option')) {
      return;
    }

    e.target.classList.add('game__option--selected');

    this._onAnswer(this._getAnswers());
  }

  _getAnswers() {
    const answersElements = this._element.querySelectorAll('.game__option');
    if (!answersElements) {
      return -1;
    }

    let index = 0;
    for (let element of answersElements) {
      if (element.classList.contains('game__option--selected')) {
        return index;
      }

      index++;
    }

    return -1;
  }
}
