import createElementFromTemplate from './create-element-from-template';
import renderElement from './render-element';
import nextElement from './stats';

let data = {
  task: 'Найдите рисунок среди изображений',
  timer: 'NN',
  lives: [
    'empty',
    'full',
    'full'
  ],
  answers: [
    {
      image: 'http://placehold.it/304x455',
      alt: 'Option 1'
    },
    {
      image: 'http://placehold.it/304x455',
      alt: 'Option 1'
    },
    {
      image: 'http://placehold.it/304x455',
      alt: 'Option 1'
    }
  ],
  stats: [
    'wrong',
    'slow',
    'fast',
    'correct',
    'wrong',
    'unknown',
    'slow',
    'unknown',
    'fast',
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
  <form class="game__content  game__content--triple">
    ${data.answers.map((value) => `
      <div class="game__option">
        <img src="${value.image}" alt="${value.alt}" width="304" height="455">
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
  if (e.target.classList.contains('game__option')) {
    renderElement(nextElement);
  }
};

export default moduleElement;
