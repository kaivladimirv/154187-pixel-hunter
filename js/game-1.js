import createElementFromTemplate from './create-element-from-template';
import renderElement from './render-element';
import nextElement from './game-2';

let data = {
  task: 'Угадайте для каждого изображения фото или рисунок?',
  timer: 'NN',
  lives: [
    'empty',
    'full',
    'full'
  ],
  questions: [
    {
      image: 'http://placehold.it/468x458',
      alt: 'Option 1'
    },
    {
      image: 'http://placehold.it/468x458',
      alt: 'Option 2'
    }
  ],
  stats: [
    'wrong',
    'slow',
    'fast',
    'correct',
    'unknown',
    'unknown',
    'unknown',
    'unknown',
    'unknown',
    'unknown'
  ]
};

let gameLives = `
  <div class="game__lives">
    ${data.lives.map((value) => `<img src="img/heart__${value}.svg" class="game__heart" alt="Life" width="32" height="32">`).join(' ')}
  </div>`;

let header = `
  <header class="header">
    <div class="header__back">
        <span class="back">
          <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
          <img src="img/logo_small.png" width="101" height="44">
        </span>
    </div>
    <h1 class="game__timer">${data.timer}</h1>
    ${gameLives}
  </header>`;

let gameContent = `
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

let stats = `
  <div class="stats">
    <ul class="stats">
      ${data.stats.map((value) => `<li class="stats__result stats__result--${value}"></li>`)}
    </ul>
  </div>`;

let template = `
  ${header}
  <div class="game">
    <p class="game__task">${data.task}</p>
    ${gameContent}
    ${stats}
  </div>`;

const moduleElement = createElementFromTemplate(template);

moduleElement.querySelector('.game').onclick = (e) => {
  if (e.target.parentElement.classList.contains('game__answer')) {
    renderElement(nextElement);
  }
};

export default moduleElement;
