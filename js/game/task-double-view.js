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
  }

  set onAnswer(handler) {
    this._onAnswer = handler;
  }

  getMarkup() {
    let statsResult = new StatsResultView(this._dataStats);
    let content = `
      <form class="game__content">
        ${this._data.answers.map((value, index) => `
          <div class="game__option">
            <img src="" alt="Option${index + 1}}" width="468" height="458">
            <label class="game__answer game__answer--photo">
              <input name="question${index + 1}" type="radio" value="${answerTypes.PHOTO}">
              <span>Фото</span>
            </label>
            <label class="game__answer game__answer--paint">
              <input name="question${index + 1}" type="radio" value="${answerTypes.PAINTING}">
              <span>Рисунок</span>
            </label>
          </div>`).join('')}
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
    this._element.querySelector('.game').addEventListener('click', this._onClick);
  }

  clearHandlers() {
    this._element.querySelector('.game').removeEventListener('click', this._onClick);
  }

  _onClick(e) {
    if (!e.target.parentElement.classList.contains('game__answer')) {
      return;
    }

    const answers = this._getAnswers();
    if (answers.length !== 2) {
      return;
    }

    this._onAnswer(answers);
  }

  _getAnswers() {
    const answersElements = this._element.querySelectorAll('[name^="question"]:checked');
    if (answersElements.length !== 2) {
      return [];
    }

    const answers = [];
    for (let element of answersElements) {
      answers.push(element.value);
    }

    return answers;
  }
}
