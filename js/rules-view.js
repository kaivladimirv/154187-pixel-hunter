import AbstractView from './abstract-view';
import header from './common/header-view';
import Application from './application';

class RulesView extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
    this._btnRulesSubmit = null;
    this._inputRules = null;
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
    this._btnRulesSubmit = this._element.querySelector('.rules__button');
    this._btnRulesSubmit.addEventListener('click', this.onClick);

    this.onInput = this.onInput.bind(this);
    this._inputRules = this._element.querySelector('.rules__input');
    this._inputRules.addEventListener('input', this.onInput);
  }

  clearHandlers() {
    this._btnRulesSubmit.removeEventListener('click', this.onClick);
    this._inputRules.removeEventListener('input', this.onInput);
  }

  onClick(e) {
    e.preventDefault();

    Application.showGame();
  }

  onInput(e) {
    if (e.target.value) {
      this._btnRulesSubmit.removeAttribute('disabled');
    } else {
      this._btnRulesSubmit.setAttribute('disabled', '');
    }
  }
}

export default (data) => new RulesView(data).element;

