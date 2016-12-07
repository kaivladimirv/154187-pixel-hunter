import createElementFromTemplate from '../create-element-from-template';
import stats from './stats';

function getTemplate(data, dataStats) {
  let content = `
    <form class="game__content  game__content--triple">
      ${data.answers.map((value) => `
        <div class="game__option">
          <img src="${value.image}" alt="${value.alt}" width="304" height="455">
        </div>`).join('')}
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

function getAnswer(moduleElement) {
  const answersElements = moduleElement.querySelectorAll('.game__option');
  if (!answersElements) {
    return -1;
  }

  let index = 0;
  for (const element of answersElements) {
    if (element.classList.contains('game__option--selected')) {
      return index;
    }

    index++;
  }

  return -1;
}

export default function (data, dataStats, onAnswer) {
  const moduleElement = createElementFromTemplate(getTemplate(data, dataStats));

  moduleElement.querySelector('.game').onclick = (e) => {
    if (!e.target.classList.contains('game__option')) {
      return;
    }

    e.target.classList.add('game__option--selected');

    onAnswer(getAnswer(moduleElement));
  };

  return moduleElement;
}
