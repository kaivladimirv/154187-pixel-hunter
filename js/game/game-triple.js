import createElementFromTemplate from '../create-element-from-template';
import renderElement from '../render-element';
import nextGame from './game';
import header from './header';
import stats from './stats';

function getTemplate(data) {
  let content = `
    <form class="game__content  game__content--triple">
      ${data.answers.map((value) => `
        <div class="game__option">
          <img src="${value.image}" alt="${value.alt}" width="304" height="455">
        </div>`).join('')}
    </form>`;

  return `
    ${header(data)}
    <div class="game">
      <p class="game__task">${data.task}</p>
      ${content}
      <div class="stats">
        ${stats(data.stats)}
      </div>
    </div>`;
}

export default function (data) {
  const moduleElement = createElementFromTemplate(getTemplate(data));

  moduleElement.querySelector('.game').onclick = (e) => {
    if (e.target.classList.contains('game__option')) {
      renderElement(nextGame(data.gameNumber + 1));
    }
  };

  return moduleElement;
}
