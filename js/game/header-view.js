import AbstractView from '../abstract-view';
import LivesView from './lives-view';
import Application from '../application';

export default class HeaderView extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
    this._onBack = null;
    this._headerBack = null;
  }

  set onBack(handler) {
    this._onBack = handler;
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

  bindHandlers() {
    this._onClick = this._onClick.bind(this);
    this._headerBack = this._element.querySelector('.header__back');
    this._headerBack.addEventListener('click', this._onClick);
  }

  clearHandlers() {
    this._headerBack.removeEventListener('click', this._onClick);
    this._headerBack = null;
  }

  _onClick() {
    this._onBack();
    Application.showWelcome();
    this.destroy();
  }

  destroy() {
    this._data = null;
    this._onBack = null;
    super.destroy();
  }
}
