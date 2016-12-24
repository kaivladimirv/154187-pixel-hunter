import AbstractView from './abstract-view';
import header from './common/header-view';
import Application from './application';

class RulesView extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
    this._btnRulesSubmit = null;
    this._inputRules = null;
    this._headerBack = null;
  }

  getMarkup() {
    let form = `
      <form class="rules__form">
        <input class="rules__input" type="text" placeholder="Ваше Имя">
        <button class="rules__button  continue" type="submit" disabled>Go!</button>
      </form>`;

    let content = `
      <div class="rules  central--none">
        <h1 class="rules__title">${this._data.title}</h1>
        <p class="rules__description">${this._data.description}</p>
        ${form}
      </div>`;

    return `
      ${header.getMarkup()}
      ${content}`;
  }

  bindHandlers() {
    this._onClick = this._onClick.bind(this);
    this._btnRulesSubmit = this._element.querySelector('.rules__button');
    this._btnRulesSubmit.addEventListener('click', this._onClick);

    this._onBackClick = this._onBackClick.bind(this);
    this._headerBack = this._element.querySelector('.header__back');
    this._headerBack.addEventListener('click', this._onBackClick);

    this._onInput = this._onInput.bind(this);
    this._inputRules = this._element.querySelector('.rules__input');
    this._inputRules.addEventListener('input', this._onInput);
  }

  clearHandlers() {
    this._btnRulesSubmit.removeEventListener('click', this._onClick);
    this._btnRulesSubmit = null;

    this._headerBack.removeEventListener('click', this._onBackClick);
    this._headerBack = null;

    this._inputRules.removeEventListener('input', this._onInput);
    this._inputRules = null;
  }

  _onClick(e) {
    e.preventDefault();

    Application.showGame(this._inputRules.value);
    this.destroy();
  }

  _onInput(e) {
    if (e.target.value) {
      this._btnRulesSubmit.removeAttribute('disabled');
    } else {
      this._btnRulesSubmit.setAttribute('disabled', '');
    }
  }

  _onBackClick() {
    Application.showWelcome();
    this.destroy();
  }

  destroy() {
    this._data = null;
    super.destroy();
  }
}

export default (data) => new RulesView(data).element;
