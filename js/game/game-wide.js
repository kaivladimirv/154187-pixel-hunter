import createElementFromTemplate from '../create-element-from-template';
import renderElement from '../render-element';
import nextGame from './game';
import header from './header';
import stats from './stats';

function getTemplate(data) {
  let content = `
    <form class="game__content  game__content--wide">
      <div class="game__option">
        <img src="${data.question.image}" alt="${data.question.alt}" width="705" height="455">
        <label class="game__answer  game__answer--photo">
          <input name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--wide  game__answer--paint">
          <input name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
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
    if (e.target.parentElement.classList.contains('game__answer')) {
      renderElement(nextGame(data.gameNumber + 1));
    }
  };

  return moduleElement;
}
