import AbstractView from './abstract-view';
import Application from './application';

class IntroView extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
    this._btn = null;
  }

  getMarkup() {
    return `
      <div id="intro" class="intro">
        <h1 class="intro__asterisk">*</h1>
        <p class="intro__motto"><sup>*</sup> ${this._data.text}</p>
      </div>`;
  }

  bindHandlers() {
    this._onClick = this._onClick.bind(this);
    this._btn = this._element.querySelector('.intro__asterisk');
    this._btn.addEventListener('click', this._onClick);
  }

  clearHandlers() {
    this._btn.removeEventListener('click', this._onClick);
    this._btn = null;
  }

  _onClick() {
    Application.showGreeting();
    this.destroy();
  }

  destroy() {
    this._data = null;
    super.destroy();
  }
}

export default (data) => new IntroView(data).element;
