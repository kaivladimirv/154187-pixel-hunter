import AbstractView from '../abstract-view';

export default class LivesView extends AbstractView {
  constructor(livesCount, maxLives) {
    super();
    this._livesCount = livesCount;
    this._maxLives = maxLives;
  }

  getMarkup() {
    return `
      <div class="game__lives">
        ${new Array(this._maxLives).fill('empty').fill('full', this._maxLives - this._livesCount).map((value) => `<img src="img/heart__${value}.svg" class="game__heart" alt="Life" width="32" height="32">`).join('\u00A0')}
      </div>`;
  }
}
