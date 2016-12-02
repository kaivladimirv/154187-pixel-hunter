import createElementFromTemplate from './create-element-from-template';
import renderElement from './render-element';
import header from './header';
import nextElement from './game/game';

function getTemplate(data) {
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

  return `
    ${header()}
    ${content}`;
}

export default function (data) {
  const moduleElement = createElementFromTemplate(getTemplate(data));

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

    let gameNumber = 1;
    renderElement(nextElement(gameNumber));
  };

  return moduleElement;
}
