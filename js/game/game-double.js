import createElementFromTemplate from '../create-element-from-template';
import stats from './stats';

function getTemplate(data, dataStats) {
  let content = `
    <form class="game__content">
      ${data.questions.map((value, index) => `
        <div class="game__option">
          <img src="${value.image}" alt="${value.alt}" width="468" height="458">
          <label class="game__answer game__answer--photo">
            <input name="question${index + 1}" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer game__answer--paint">
            <input name="question${index + 1}" type="radio" value="paint">
            <span>Рисунок</span>
          </label>
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

function getAnswers(moduleElement) {
  const answersElements = moduleElement.querySelectorAll('[name^="question"]:checked');
  if (answersElements.length !== 2) {
    return [];
  }

  const answers = [];
  for (const element of answersElements) {
    answers.push(element.value);
  }

  return answers;
}

export default function (data, dataStats, onAnswer) {
  const moduleElement = createElementFromTemplate(getTemplate(data, dataStats));

  moduleElement.querySelector('.game').onclick = (e) => {
    if (!e.target.parentElement.classList.contains('game__answer')) {
      return;
    }

    const answers = getAnswers(moduleElement);
    if (answers.length !== 2) {
      return;
    }

    onAnswer(answers);
  };

  return moduleElement;
}
