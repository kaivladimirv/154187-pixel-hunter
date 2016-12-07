import createElementFromTemplate from '../create-element-from-template';
import stats from './stats';

function getTemplate(data, dataStats) {
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
    <div class="game">
      <p class="game__task">${data.task}</p>
      ${content}
      <div class="stats">
        ${stats(dataStats)}
      </div>
    </div>`;
}

export default function (data, dataStats, onAnswer) {
  const moduleElement = createElementFromTemplate(getTemplate(data, dataStats));

  moduleElement.querySelector('.game').onclick = (e) => {
    if (!e.target.parentElement.classList.contains('game__answer') || !e.target.value) {
      return;
    }

    onAnswer(e.target.value);
  };

  return moduleElement;
}
