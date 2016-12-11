import AbstractView from './abstract-view';
import {renderElement} from './utils';
import nextElement from './rules-view';
import getData from './data/rules-data';

class GreetingView extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
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
    this._element.querySelector('.greeting__continue').addEventListener('click', this.onClick);
  }

  clearHandlers() {
    this._element.querySelector('.greeting__continue').removeEventListener('click', this.onClick);
  }

  onClick() {
    renderElement(nextElement(getData()));
  }
}

export default (data) => new GreetingView(data).element;