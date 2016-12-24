import AbstractView from './abstract-view';
import Application from './application';

class GreetingView extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
    this._btn = null;
  }

  getMarkup() {
    const logo = '<div class="greeting__logo"><img src="img/logo_big.png" width="201" height="89" alt="Pixel Hunter"></div>';
    const challenge = `
      <div class="greeting__challenge">
        <h3>${this._data.title}</h3>
        <p>${this._data.description}</p>
      </div>`;

    return `
      <div class="greeting  central--blur">
        ${logo}
        <h1 class="greeting__asterisk">*</h1>
        ${challenge}
        <div class="greeting__continue"><span><img src="img/arrow_right.svg" width="64" height="64" alt="Next"></span></div>
      </div>`;
  }

  bindHandlers() {
    this._onClick = this._onClick.bind(this);
    this._btn = this._element.querySelector('.greeting__continue');
    this._btn.addEventListener('click', this._onClick);
  }

  clearHandlers() {
    this._btn.removeEventListener('click', this._onClick);
  }

  _onClick() {
    Application.showRules();
    this.destroy();
  }

  destroy() {
    super.destroy();
    this._data = null;
    this._btn = null;
  }
}

export default (data) => new GreetingView(data).element;
