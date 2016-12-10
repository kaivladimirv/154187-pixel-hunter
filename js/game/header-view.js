import AbstractView from '../abstract-view';
import LivesView from './lives-view';

export default class HeaderView extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  getMarkup() {
    let lives = new LivesView(this._data.livesCount, this._data.maxLives);

    return `
      <header class="header">
        <div class="header__back">
          <span class="back">
            <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
            <img src="img/logo_small.png" width="101" height="44">
          </span>
        </div>
        <h1 class="game__timer">${this._data.time}</h1>
        ${lives.getMarkup()}
      </header>`;
  }
}
