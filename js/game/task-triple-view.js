import AbstractView from '../abstract-view';
import StatsResultView from '../common/stats-result-view';
import {loadImages} from '../utils';

export default class TaskTripleView extends AbstractView {
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

    this._onClick = this._onClick.bind(this);
    this._clickablElement = this._element.querySelector('.game');
    this._clickablElement.addEventListener('click', this._onClick);
  }

  clearHandlers() {
    this._clickablElement.removeEventListener('click', this._onClick);
  }

  _onClick(e) {
    if (!e.target.classList.contains('game__option')) {
      return;
    }

    e.target.classList.add('game__option--selected');

    this._onAnswer(this._getAnswers());
    this.destroy();
  }

  _getAnswers() {
    const answersElements = this._element.querySelectorAll('.game__option');
    if (!answersElements) {
      return -1;
    }

    let elements = Array.prototype.slice.call(answersElements);
    for (let index = 0; index < elements.length; index++) {
      if (elements[index].classList.contains('game__option--selected')) {
        return index;
      }
    }

    return -1;
  }

  destroy() {
    super.destroy();
    this._data = null;
    this._dataStats = null;
    this._onAnswer = null;
    this._clickablElement = null;
  }
}
