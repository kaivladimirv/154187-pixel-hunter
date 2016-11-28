import createElementFromTemplate from './create-element-from-template';
import renderElement from './render-element';
import nextElement from './game-1';

let data = {
  title: 'Правила',
  description: `Угадай 10 раз для каждого изображения фото <img
    src="img/photo_icon.png" width="16" height="16"> или рисунок <img
    src="img/paint_icon.png" width="16" height="16" alt="">.<br>
    Фотографиями или рисунками могут быть оба изображения.<br>
    На каждую попытку отводится 30 секунд.<br>
    Ошибиться можно не более 3 раз.<br>
    <br>
    Готовы?`
};

let header = `
  <header class="header">
    <div class="header__back">
      <span class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.png" width="101" height="44">
      </span>
    </div>
  </header>`;

let form = `
  <form class="rules__form">
    <input class="rules__input" type="text" placeholder="Ваше Имя">
    <button class="rules__button  continue" type="submit" disabled>Go!</button>
  </form>`;

let content = `
  <div class="rules  central--none">
    <h1 class="rules__title">${data.title}</h1>
    <p class="rules__description">${data.description}</p>
    ${form}
  </div>`;

let template = `
  ${header}
  ${content}`;

const moduleElement = createElementFromTemplate(template);

const rulesSubmit = moduleElement.querySelector('.rules__button');
moduleElement.querySelector('.rules__input').oninput = (e) => {
  if (e.target.value) {
    rulesSubmit.removeAttribute('disabled');
  } else {
    rulesSubmit.setAttribute('disabled', '');
  }
};

moduleElement.querySelector('.rules__button').onclick = (e) => {
  e.preventDefault();

  renderElement(nextElement);
};

export default moduleElement;
