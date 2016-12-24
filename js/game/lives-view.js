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
        ${[...new Array(this._maxLives)].map((value, index) => `<img src="img/heart__${index < (this._maxLives - this._livesCount) ? 'empty' : 'full'}.svg" class="game__heart" alt="Life" width="32" height="32">`).join('\u00A0')}
      </div>`;
  }
}

