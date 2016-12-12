import AbstractView from './abstract-view';
import Application from './application';

class IntroView extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  getMarkup() {
    return `
      <div id="intro" class="intro">
        <h1 class="intro__asterisk">*</h1>
        <p class="intro__motto"><sup>*</sup> ${this._data.text}</p>
      </div>`;
  }

  bindHandlers() {
    this._element.querySelector('.intro__asterisk').addEventListener('click', this.onClick);
  }

  clearHandlers() {
    this._element.querySelector('.intro__asterisk').removeEventListener('click', this.onClick);
  }

  onClick() {
    Application.showGreeting();
  }
}

export default (data) => new IntroView(data).element;
